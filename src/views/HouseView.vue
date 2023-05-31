<template>
  <div class="main-container">
    <div v-if="houses.length > 0">
      <div class="house-list">
        <div class="upper-container">
          <h1>Houses</h1>

          <RouterLink :to="`/houses/create`" class="desk-create-btn">
            <button>
              <div class="create-button-container">
                <img src="../assets/images/ic_plus_white@3x.png" alt="plus" />
                <p>CREATE NEW</p>
              </div>
            </button>
          </RouterLink>

          <RouterLink :to="`/houses/create`" class="mobile-create-btn">
            <button>
              <img src="../assets/images/ic_plus_grey@3x.png" alt="plus" />
            </button>
          </RouterLink>
        </div>

        <div class="lower-container">
          <div class="input-container">
            <img src="../assets/images/ic_search@3x.png" alt="" />
            <input
              type="search"
              v-model="searchQuery"
              placeholder="Search for a house"
            />
          </div>

          <div v-if="result !== 0" class="buttons-container">
            <button
              id="price-btn"
              :class="{ selected: priceSelected }"
              @click="sortByPrice()"
            >
              Price
            </button>
            <button
              id="size-btn"
              :class="{ selected: sizeSelected }"
              @click="sortBySize()"
            >
              Size
            </button>
            <button
              id="list-btn"
              :class="{ selected: myListSelected }"
              @click="sortByMyList()"
            >
              My listings
            </button>
          </div>
        </div>

        <div v-if="searchQuery && result > 0" class="search-result">
          <h2>{{ result }} results found</h2>
        </div>

        <div v-if="result === 0" class="no-results">
          <img
            src="../assets/images/img_empty_houses@3x.png"
            alt="empty house"
          />
          <p>No results found.</p>
          <p>Please try another keyword.</p>
        </div>

        <div :key="house._id" v-for="house in filterHouses" class="house-list-position">
          <HouseList
            :house="house"
            @open-delete-dialog="handleOpenDeleteDialog"
          />
        </div>

        <DeleteDialog v-if="showDeleteDialog" :houseId="selectedHouseId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useHouseStore } from "../stores/HouseStore";
import HouseList from "../components/HouseList.vue";
import DeleteDialog from "../components/DeleteDialog.vue";
import { ref, computed, reactive, onMounted } from "vue";

const houseStore = useHouseStore();
const priceSelected = ref(true);
const sizeSelected = ref(false);
const myListSelected = ref(false);
const priceDescending = ref(false);
const sizeDescending = ref(false);
const myListDescending = ref(false);
const searchQuery = ref("");
const selectedHouseId = ref(null)

const { houses, resultCount, showDeleteDialog } = storeToRefs(houseStore);

const handleOpenDeleteDialog = (houseId) => {
  selectedHouseId.value = houseId;
  houseStore.openDeleteDialog();
};

const sortByPrice = () => {
  priceSelected.value = true;
  sizeSelected.value = false;
  myListSelected.value = false;
  priceDescending.value = !priceDescending.value;

  if (priceDescending.value) {
    return houseStore.houses.sort((a, b) => a.price - b.price);
  } else {
    return houseStore.houses.sort((a, b) => b.price - a.price);
  }
};

const sortBySize = () => {
  sizeSelected.value = true;
  priceSelected.value = false;
  myListSelected.value = false;
  sizeDescending.value = !sizeDescending.value;

  if (sizeDescending.value) {
    return houseStore.houses.sort((a, b) => a.size - b.size);
  } else {
    return houseStore.houses.sort((a, b) => b.size - a.size);
  }
};

const sortByMyList = () => {
  sizeSelected.value = false;
  priceSelected.value = false;
  myListSelected.value = true;
  myListDescending.value = !myListDescending.value;

  if (myListDescending.value) {
    return houseStore.houses.sort((a, b) => a.madeBy.localeCompare(b.madeBy));
  } else {
    return houseStore.houses.sort((a, b) => b.madeBy.localeCompare(a.madeBy));
  }
};

const filterHouses = computed(() => {
  return houseStore.searchHouses(searchQuery) || [];
});

const result = computed(() => {
  return filterHouses.value.length;
});

onMounted(async () => {
  await houseStore.getHouses();
});
</script>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";

.main-container {
  @media (min-width: 479px) {
    .mobile-create-btn {
      display: none;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: flex-start;
  max-width: 100vw;
  padding: 3rem 10rem;
  padding-top: 13rem;

  .house-list {
    position: relative;
    top: 1.5rem;
    width: 73vw;
    display: flex;
    margin: 1rem 0;
    flex-direction: column;

    .upper-container {
      display: flex;
      position: fixed;
      width: 73vw;
      height: 14rem;
      padding: 0 2rem;
      justify-content: space-between;
      background-color: $background-color-1;
      align-items: center;
      top: 2rem;
      z-index: 1;

      button {
        color: white;

        .create-button-container {
          display: flex;
          align-items: center;

          img {
            width: 1rem;
            margin-right: 1rem;
          }
        }
      }
    }

    .lower-container {
      display: flex;
      position: fixed;
      width: 73vw;
      padding: 0 2rem;
      justify-content: space-between;
      background-color: $background-color-1;
      align-items: center;
      top: 12rem;
      z-index: 2;

      .input-container {
        display: flex;
        position: relative;
        align-items: center;

        img {
          width: 1.3rem;
          position: absolute;
          left: 1rem;
        }

        input {
          background-color: $tertiary-color-light;
          border: none;
          border-radius: 0.375rem;
          height: 2.5rem;
          width: 28vw;
          padding-left: 3rem;
        }

        input::placeholder {
          color: $tertiary-color-dark;
        }

        input:focus {
          outline: none;
        }

        input::-webkit-search-cancel-button {
          -webkit-appearance: none;
          height: 1.3rem;
          width: 1.3rem;
          object-fit: scale-down;
          border-radius: 100%;
          background-image: url("../assets/images/ic_clear@3x.png");
          background-size: 100%;
          cursor: pointer;
          margin-right: 1rem;
        }
      }

      .buttons-container {
        display: flex;
        width: 28rem;

        .selected {
          background-color: $primary-color;
        }

        button {
          width: 50%;
          color: white;
          background-color: $tertiary-color-dark;
        }

        #price-btn {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: 1px $background-color-2 solid;
        }

        #size-btn {
          border-radius: 0;
        }

        #list-btn {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left: 1px $background-color-2 solid;
        }
      }
    }

    .search-result {
      margin-top: 2rem;
      margin-bottom: 1rem;
    }

    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 5rem 0;

      img {
        width: 24rem;
        margin-bottom: 2rem;
      }

      p {
        color: $text-secondary-color;
        font-size: $empty-state-message-desktop;
        font-family: $font-family-montserrat;
      }
    }

    .house-list-position {
      padding: 0 2rem;
      width: 100%;
    }
  }
}

@media (max-width: 479px) {
  .main-container {
    .desk-create-btn {
      display: none;
    }
    padding: 0 2rem;
    align-items: center;

    .house-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      padding-top: 11rem;
      padding-bottom: 5rem;
      margin: 0;

      .upper-container {
        display: flex;
        position: fixed;
        top: 0;
        background-color: $background-color-1;
        height: 5rem;
        width: 100%;
        justify-content: center;
        padding: 0;
        padding-top: 2rem;
        z-index: 1;

        h1 {
          text-align: center;
          position: fixed;
          top: 1.9rem;
        }

        button {
          background-color: $background-color-1;
          position: fixed;
          top: 1.5rem;
          right: 1rem;

          img {
            width: 1rem;
          }
        }
      }

      .lower-container {
        flex-direction: column;
        position: fixed;
        width: 100%;
        top: 3rem;
        align-items: center;
        background-color: $background-color-1;
        z-index: 1;
        padding: 0;
        padding-bottom: 1rem;

        .input-container {
          margin-top: 2rem;
          margin-bottom: 1rem;

          input {
            width: 90vw;
          }
        }
      }
      .buttons-container {
        display: flex;
        max-width: 90%;
        height: 2.5rem;
      }
      .search-result {
        margin-top: 0rem;
        margin-bottom: 1rem;
      }

      .no-results {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 5rem 0;

        img {
          width: 18rem;
          margin-bottom: 2rem;
        }

        p {
          font-size: $empty-state-message-mobile;
        }
      }

      .house-list-position {
      padding: 0;
      width: 90vw;
    }
    }
  }
}
</style>