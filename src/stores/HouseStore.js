import { markRaw } from "vue";
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const baseURL = "http://localhost:5005/api/houses";

function createAxiosInstance(store) {
  const instance = axios.create({
    baseURL
  });

  instance.interceptors.request.use(
    (config) => {
      store.submittingForm = true;
      return config;
    },
    (error) => {
      store.submittingForm = false;
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      store.submittingForm = false;
      return response;
    },
    (error) => {
      store.submittingForm = false;
      return Promise.reject(error);
    }
  );

  return instance;
}

export const useHouseStore = defineStore("houseStore", {
  state: () => ({
    houses: [],
    searchQuery: "",
    showDeleteDialog: false,
    submittingForm: false,
    imageUrl: null,
    showUploadedImage: true,
    imageUploaded: true,
    formData: {
      streetName: "",
      houseNumber: "",
      numberAddition: "",
      zip: "",
      city: "",
      housePicture: null,
      price: "",
      size: "",
      hasGarage: "",
      bedrooms: "",
      bathrooms: "",
      constructionYear: "",
      description: "",
    },
  }),
  getters: {
    allHouses: (state) => {
      return state.houses;
    },
    searchHouses: (getters) => (searchQuery) => {
      return getters.allHouses.filter((house) => {
        return (
          house.location.city
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          house.location.street
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          house.location.zip
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          house.size.toString().includes(searchQuery.value) ||
          house.price.toString().includes(searchQuery.value)
        );
      });
    },
    recommendedHouses: (getters) => (houseId) => {
      const house = getters.allHouses.find((house) => house._id === houseId);
      const city = house.location.city;
      const recommendedHouses = [];

      // First, prioritize houses in the same city.
      getters.allHouses.forEach((house) => {
        if (recommendedHouses.length < 5) {
          if (house.location.city === city && house._id !== houseId) {
            recommendedHouses.push(house);
          }
        }
      });

      // If there are less than 5 recommended houses, find the closest price houses.
      if (recommendedHouses.length < 5) {
        const remainingHouses = getters.allHouses.filter(
          (houseItem) =>
            houseItem._id !== houseId && !recommendedHouses.includes(houseItem)
        );

        let continueAdding = true;
        remainingHouses.forEach(() => {
          if (continueAdding && recommendedHouses.length < 5) {
            const closestPriceHouse = remainingHouses.reduce((a, b) => {
              return Math.abs(b.price - house.price) <
                Math.abs(a.price - house.price)
                ? b
                : a;
            });

            recommendedHouses.push(closestPriceHouse);

            // Remove the added house from the remainingHouses array.
            const index = remainingHouses.indexOf(closestPriceHouse);
            if (index > -1) {
              remainingHouses.splice(index, 1);
            }
          } else {
            continueAdding = false;
          }
        });
      }

      return recommendedHouses;
    },
    getHouseById: (getters) => (houseId) => {
      return getters.allHouses.find((house) => house._id === houseId);
    },
    anyFieldType: (state) => {
      return (
        state.formData.streetName ||
        state.formData.houseNumber ||
        state.formData.zip ||
        state.formData.city ||
        state.formData.price ||
        state.formData.size ||
        state.formData.hasGarage ||
        state.formData.bedrooms ||
        state.formData.bathrooms ||
        state.formData.constructionYear ||
        state.formData.description
      );
    },
    isFormValid: (state) => {
      return (
        state.formData.streetName &&
        state.formData.houseNumber &&
        state.formData.zip &&
        state.formData.city &&
        state.formData.price &&
        state.formData.size &&
        state.formData.hasGarage &&
        state.formData.bedrooms &&
        state.formData.bathrooms &&
        state.formData.constructionYear &&
        state.formData.description
      );
    },
  },
  actions: {
    async getHouses() {
      const instance = createAxiosInstance(this);
      try {
        const response = await instance.get(baseURL);
        if (!response) {
          this.houses = [];
        }
        this.houses = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteHouse(id, router) {
      const instance = createAxiosInstance(this);
      try {
        const response = await instance.delete(`${baseURL}/${id}`);

        this.houses = this.houses.filter((house) => house._id !== id);

        this.houses = [...this.houses];

        router.push(`/`);
      } catch (error) {
        console.error(error);
      }
    },
    onFileChange(event) {
      this.imageUploaded = true;
      this.formData.housePicture = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.housePicture);
    },
    resetFromData() {
      this.imageUrl = null;
      this.showUploadedImage = true;
      this.formData = {
        streetName: "",
        houseNumber: "",
        numberAddition: "",
        zip: "",
        city: "",
        housePicture: null,
        price: "",
        size: "",
        hasGarage: "",
        bedrooms: "",
        bathrooms: "",
        constructionYear: "",
        description: "",
      };
      this.houses = [...this.houses];
    },
    async handleSubmit(router) {
      const instance = createAxiosInstance(this);
    
      const formData = new FormData();
      formData.append("streetName", this.formData.streetName);
      formData.append("houseNumber", this.formData.houseNumber);
      formData.append("numberAddition", this.formData.numberAddition);
      formData.append("zip", this.formData.zip);
      formData.append("city", this.formData.city);
      formData.append("housePicture", this.formData.housePicture);
      formData.append("price", this.formData.price);
      formData.append("size", this.formData.size);
      formData.append("hasGarage", this.formData.hasGarage);
      formData.append("bedrooms", this.formData.bedrooms);
      formData.append("bathrooms", this.formData.bathrooms);
      formData.append("constructionYear", this.formData.constructionYear);
      formData.append("description", this.formData.description);
      formData.append("madeByMe", true);
    
      try {
        const response = await instance.post(baseURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        const houseId = response.data._id;
    
        this.resetFromData();
        router.push(`/houses/${houseId}`);
      } catch (error) {
        console.log(error);
      }
    },
    async handleEditSubmit(houseId, image, router) {
      const instance = createAxiosInstance(this);
      const form = document.getElementById("edit-house-form");
      const formData = new FormData(form);

      if (this.formData.housePicture === null) {
        formData.set("housePicture", image);
      } else {
        formData.set("housePicture", this.formData.housePicture);
      }

      try {
        const response = await instance.put(`${baseURL}/${houseId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.resetFromData();
        router.push(`/houses/${houseId}`);
      } catch (error) {
        console.log(error);
      }
    },
    filterHouses(houseId) {
      return computed(() => {
        return this.recommendedHouses(houseId);
      });
    },
    openDeleteDialog() {
      this.showDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
    },
    clearImage() {
      this.imageUploaded = false;
      this.showUploadedImage = false;
      this.imageUrl = "";
      this.formData.housePicture = "";
    },
    clearUrl() {
      this.showUploadedImage = true;
      this.imageUrl = "";
    },
  },
});
