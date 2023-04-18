<template>
  <form
    v-if="house"
    id="edit-house-form"
    @submit.prevent="submitForm"
    enctype="multipart/form-data"
  >
    <label for="streetName">Street name*</label>
    <input
      type="text"
      required
      id="streetName"
      name="streetName"
      v-model="splitStreetName"
      placeholder="Enter the street name"
    />

    <div class="two-columns-container">
      <div class="half-size-container">
        <label for="houseNumber">House number*</label>
        <input
          type="number"
          required
          id="houseNumber"
          name="houseNumber"
          v-model="splitHouseNumber"
          placeholder="Enter house number"
          min="0"
        />
      </div>

      <div class="half-size-container">
        <label for="numberAddition">Addition (optional)</label>
        <input
          type="text"
          id="numberAddition"
          name="numberAddition"
          v-model="splitNumberAddition"
          placeholder="e.g. A"
        />
      </div>
    </div>

    <label for="zip">Postal code*</label>
    <input
      type="text"
      required
      id="zip"
      name="zip"
      v-model="house.location.zip"
      placeholder="e.g. 1000 AA"
    />
    <label for="city">City*</label>
    <input
      type="text"
      required
      id="city"
      name="city"
      v-model="house.location.city"
      placeholder="e.g. Utrecht"
    />

    <label for="housePicture">Upload picture (PNG or JPG)*</label>
    <div class="edit-upload-container">
      <div class="image-input">
        <img
          class="uploaded-image"
          v-if="showUploadedImage"
          :src="house.image"
          alt="uploaded image"
        />

        <div class="upload-container">
          <img
            v-if="!imageUrl"
            class="upload-logo"
            src="../assets/images/ic_upload@3x.png"
            alt="upload"
          />
          <img
            v-if="imageUrl"
            class="upload-image"
            :src="imageUrl"
            alt="upload"
          />
          <input
            type="file"
            class="housePicture"
            id="housePicture"
            name="housePicture"
            ref="housePicture"
            accept="image/*"
            @change="houseStore.onFileChange"
          />
        </div>
      </div>
      <img
        v-if="'showUploadedImage' || 'upload-image'"
        class="clear-image"
        src="../assets/images/ic_clear_white@3x.png"
        alt="clear image"
        @click="houseStore.clearImage"
      />
    </div>

    <label for="price">Price*</label>
    <input
      type="number"
      required
      id="price"
      name="price"
      v-model="house.price"
      placeholder="e.g. &euro;150.000"
      min="0"
    />

    <div class="two-columns-container">
      <div class="half-size-container">
        <label for="size">Size*</label>
        <input
          type="number"
          required
          id="size"
          name="size"
          v-model="house.size"
          placeholder="e.g. 60m&sup2;"
          min="0"
        />
      </div>

      <div class="half-size-container">
        <label for="hasGarage">Garage*</label>
        <select
          required
          id="hasGarage"
          name="hasGarage"
          v-model="house.hasGarage"
        >
          <option class="select-placeholder" value="" disabled selected>
            Select
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>

    <div class="two-columns-container">
      <div class="half-size-container">
        <label for="bedrooms">Bedrooms*</label>
        <input
          type="number"
          required
          id="bedrooms"
          name="bedrooms"
          v-model="house.rooms.bedrooms"
          placeholder="Enter amount"
          min="0"
        />
      </div>

      <div class="half-size-container">
        <label for="bathrooms">Bathrooms*</label>
        <input
          type="number"
          required
          id="bathrooms"
          name="bathrooms"
          v-model="house.rooms.bathrooms"
          placeholder="Enter amount"
          min="0"
        />
      </div>
    </div>

    <label for="constructionYear">Construction date*</label>
    <input
      type="number"
      required
      id="constructionYear"
      name="constructionYear"
      v-model="house.constructionYear"
      placeholder="e.g. 1990"
      min="1850"
      max="2023"
    />
    <label for="description">Description*</label>
    <textarea
      type="text"
      required
      id="description"
      name="description"
      v-model="house.description"
      placeholder="Enter description"
    />

    <div v-if="!imageUploaded" class="error-message">
      Please upload an image.
    </div>

    <div class="submit">
      <button
        class="sumbit-button"
        id="save-btn"
        :style="{
          opacity: imageUploaded? '1' : '0.5',
        }"
        @click="formSubmitted = true"
        :disabled="submittingForm || !imageUploaded"
      >
        <span v-if="submittingForm">Loading...</span>
        <span v-if="!submittingForm">SAVE</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useHouseStore } from "../stores/HouseStore";
import { ref, computed, onMounted, defineProps } from "vue";
import { storeToRefs } from "pinia";

// Create refs for the house and split address values
const [house, splitStreetName, splitNumberAddition, splitHouseNumber] = [
  ref(null),
  ref(""),
  ref(""),
  ref(""),
];

const props = defineProps({
  houseId: String
})

const formSubmitted = ref(false);

const houseStore = useHouseStore();

const { formData, showUploadedImage, submittingForm, imageUrl, imageUploaded } = storeToRefs(houseStore);

const router = useRouter();
const houseId = props.houseId;

async function fetchHouse() {
  await houseStore.getHouses();
  const houseData = houseStore.getHouseById(houseId);

  if (houseData) {
    house.value = houseData;
    const streetAddress = houseData.location.street;
    
    // Regular expression to match street name, house number, and number addition
    const addressRegex = /^([\D\s]+?)\s+(\d+)\s*([a-zA-Z]*)$/;
    const match = streetAddress.match(addressRegex);

    if (match) {
      splitStreetName.value = match[1]; 
      splitHouseNumber.value = match[2];
      splitNumberAddition.value = match[3]; 
    } else {
      console.error("Invalid street address format:", streetAddress);
    }
  }
}

function submitForm() {
  formSubmitted.value = true;
  houseStore.handleEditSubmit(houseId, house.value.image, router);
}

onMounted(async () => {
  await fetchHouse();
});
</script>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";

.edit-upload-container {
  width: 10rem;
  height: 10rem;
  display: flex;
  position: relative;

  .image-input {
    position: relative;
    display: flex;
    border-radius: 0.375rem;
    justify-content: center;
    overflow: hidden;

    .upload-container {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 9rem;
      height: 9rem;
      border: 0.5rem $tertiary-color-dark dashed;

      .upload-logo {
        width: 2rem;
        z-index: 0;
      }

      .upload-image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      .housePicture {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }

  .clear-image {
    height: 2.5rem;
    z-index: 2;
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    cursor: pointer;
  }

  .uploaded-image {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
}

@media (max-width: 479px) {
  .edit-upload-container {
    width: 6rem;
    height: 6rem;

    .image-input {
      position: relative;
      display: flex;
      border-radius: 0.375rem;
      justify-content: center;
      overflow: hidden;

      .upload-container {
        width: 5rem;
        height: 5rem;
        border: 0.3rem $tertiary-color-dark dashed;

        .upload-logo {
          width: 1.5rem;
        }
      }
    }
  }
}
</style>