<template>
  <div class="house-list-container" @click="navigateToHouse">
    <img class="house-image" :src="house.image" alt="house image" />
    <div class="content-container">
      <h2>{{ house.location.street }}</h2>
      <p class="price">&euro; {{ house.price.toLocaleString("nl-NL") }}</p>
      <div class="location-container">
        <p>{{ house.location.zip }}</p>
        <p>{{ house.location.city }}</p>
      </div>

      <div class="rooms-area-container">
        <img src="../assets/images/ic_bed@3x.png" alt="bedroom" />
        <p>{{ house.rooms.bedrooms }}</p>
        <img src="../assets/images/ic_bath@3x.png" alt="bathroom" />
        <p>{{ house.rooms.bathrooms }}</p>
        <img src="../assets/images/ic_size@3x.png" alt="size" />
        <p>{{ house.size }} m&sup2;</p>
      </div>
    </div>

    <div v-if="house.madeBy === userEmail" class="icon-container">
        <img
          class="edit-icon"
          src="../assets/images/ic_edit@3x.png"
          alt="edit icon"
          @click.stop="navigateToEditHouse"
        />

      <img
        class="delete-icon"
        src="../assets/images/ic_delete@3x.png"
        alt="delete icon"
        @click.stop="$emit('open-delete-dialog', house._id)"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useHouseStore } from "../stores/HouseStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  house: Object,
});

const houseStore = useHouseStore();
const {userEmail} = storeToRefs(houseStore);

const router = useRouter();

const navigateToHouse = () => {
  router.push(`/houses/${props.house._id}`);
};

const navigateToEditHouse = () => {
  router.push(`/houses/${props.house._id}/edit`);
};
</script>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";

.house-list-container {
  display: flex;
  background-color: #ffffff;
  position: relative;
  margin: 0.7rem 0;
 
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;

  .house-image {
    height: 8rem;
    width: 8rem;
    margin: 1.2rem 1rem;
    margin-right: 0;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .content-container {
    display: flex;
    position: absolute;
    top: 1rem;
    left: 9rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 1.5rem;
    line-height: 1.8;

    .price {
      font-weight: 600;
    }

    p {
      color: $text-primary-color;
      font-family: $font-family-open-sans;
      font-size: $body-text-desktop;
    }

    .location-container {
      display: flex;

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

.house-list-container:hover {
  transform: scale(1.02);
}

@media (max-width: 479px) {
  .house-list-container {
    width: 90vw;
    margin: 0.7rem 0;

    .house-image {
      height: 6rem;
      width: 6rem;
      margin: 0 0.7rem;
      object-fit: cover;
      border-radius: 0.5rem;
    }

    .content-container {
      padding-left: 0rem;
      line-height: 1.8;
      position: absolute;
      left: 7.5rem;
      top: 1.3rem;

      .price {
        font-weight: 100;
      }

      p {
        color: $text-primary-color;
        font-family: $font-family-open-sans;
        font-size: $body-text-mobile;
      }

      .location-container {
        display: flex;

        p {
          color: $tertiary-color-dark;
          margin-right: 0.5rem;
        }
      }
    }

    .rooms-area-container {
      display: flex;
      align-items: center;
      margin-top: 0.3rem;

      p {
        font-size: $listing-information-mobile;
        margin-right: 1rem;
      }

      img {
        width: 1rem;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>