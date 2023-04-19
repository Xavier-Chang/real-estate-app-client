<template>
  <div class="recommendation-container">
    <h2>Recommended for you</h2>

    <div
      class="house-list-container"
      :key="recommendedHouse._id"
      v-for="recommendedHouse in recommendedHouses"
    >
      <div @click="goToHouseDetail(recommendedHouse._id)">
        <img
          class="house-image"
          :src="recommendedHouse.image"
          alt="house image"
        />
      </div>
      <div class="content-container">
        <h2 @click="goToHouseDetail(recommendedHouse._id)">
          {{ recommendedHouse.location.street }}
        </h2>

        <p class="price">
          &euro; {{ recommendedHouse.price.toLocaleString("nl-NL") }}
        </p>
        <div class="location-container">
          <p>{{ recommendedHouse.location.zip }}</p>
          <p>{{ recommendedHouse.location.city }}</p>
        </div>

        <div class="rooms-area-container">
          <img src="../assets/images/ic_bed@3x.png" alt="bedroom" />
          <p>{{ recommendedHouse.rooms.bedrooms }}</p>
          <img src="../assets/images/ic_bath@3x.png" alt="bathroom" />
          <p>{{ recommendedHouse.rooms.bathrooms }}</p>
          <img src="../assets/images/ic_size@3x.png" alt="size" />
          <p>{{ recommendedHouse.size }} m&sup2;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHouseStore } from "../stores/HouseStore";
import { computed, onMounted} from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';

const props = defineProps({
  houseId: String,
});

const houseStore = useHouseStore();
const router = useRouter();
const house = computed(() => houseStore.houses.find((house) => house._id === props.houseId));

const goToHouseDetail =  (houseId) => {
  
  location.href = `/houses/${houseId}`;
};

const recommendedHouses = houseStore.filterHouses(props.houseId);

onMounted(async () => {
  await houseStore.getHouses();
});
</script>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";
.recommendation-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 4rem;
  right: 12rem;
  padding-top: 3rem;

  .house-list-container {
    display: flex;
    padding: 0.5rem 0.5rem;
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    background-color: $background-color-2;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .house-image {
      height: 7rem;
      width: 7rem;
      object-fit: cover;
      border-radius: 0.5rem;
      cursor: pointer;
    }

    .house-image:hover {
      transform: scale(1.05);
    }

    .content-container {
      display: flex;
      flex-direction: column;

      align-items: flex-start;
      padding: 0.5rem;
      line-height: 0.5;
      gap: 0.8rem;

      h2 {
        font-family: $font-family-open-sans;
        font-weight: 600;
        font-size: $listing-information-desktop;
        line-height: 1;
        cursor: pointer;
      }

      h2:hover {
        color: $hyperlink-color;
        transform: scale(1.02);
      }

      .price {
        font-weight: 600;
      }

      p {
        color: $text-primary-color;
        font-family: $font-family-open-sans;
        font-size: $listing-information-desktop;
      }

      .location-container {
        display: flex;
        margin-top: 0.2rem;

        p {
          color: $tertiary-color-dark;
          margin-right: 0.5rem;
        }
      }
    }

    .rooms-area-container {
      display: flex;
      align-items: center;

      p {
        font-size: $listing-information-desktop;
        margin-right: 1.2rem;
      }

      img {
        width: 1.3rem;
        margin-right: 0.7rem;
      }
    }
  }
}

@media (max-width: 1220px) {
  .recommendation-container {
    position: relative;
    padding: 0 12rem;

    h2 {
        width: 60vw;
    }

    .house-list-container {
      width: 68vw;}
  }
}

@media (max-width: 479px) {
  .recommendation-container {
    position:relative;
    padding: 1.5rem 1rem;
    padding-bottom: 5rem;
    top: 0;
    right: 0;

    .house-list-container {
      width: 90vw;
      padding: 1rem 0rem;
      margin: 0.7rem 0;

      .house-image {
        height: 6rem;
        width: 6rem;
        margin-left: 0.7rem;
        object-fit: cover;
        border-radius: 0.5rem;
      }

      .content-container {
        padding-left: 1rem;

        .price {
          font-weight: 100;
        }

        p {
          font-size: $body-text-mobile;
        }

      }

      .rooms-area-container {
        margin-top: 0.1rem;

        p {
          font-size: $listing-information-mobile;
          margin-right: 1rem;
        }

        img {
          width: 0.8rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
