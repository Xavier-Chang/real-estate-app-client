<template>
  <div v-if="house" class="house-detail-page-container">
    <RouterLink to="/">
      <div class="desk-back-home-container">
        <img
          src="../assets/images/ic_back_grey@3x.png"
          alt="back to overview"
        />
        <p>Back to overview</p>
      </div>
    </RouterLink>

    <RouterLink to="/">
      <div class="mobile-back-home-container">
        <img
          src="../assets/images/ic_back_white@3x.png"
          alt="back to overview"
        />
      </div>
    </RouterLink>

    <div v-if="house.madeBy === userEmail" class="mobile-icon-container">
      <RouterLink :to="`/houses/${house._id}/edit`">
        <img
          class="edit-icon"
          src="../assets/images/ic_edit_white@3x.png"
          alt="edit icon"
        />
      </RouterLink>

      <img
        class="delete-icon"
        src="../assets/images/ic_delete_white@3x.png"
        alt="delete icon"
        @click="houseStore.openDeleteDialog"
      />

      <DeleteDialog v-if="showDeleteDialog" :houseId="house._id" />
    </div>

    <div class="details-container">
      <img class="house-detail-image" :src="house.image" alt="house image" />

      <div class="content-container">
        <h1>{{ house.location.street }}</h1>
        <div class="element-container">
          <img src="../assets/images/ic_location@3x.png" alt="location logo" />
          <p id="zip">{{ house.location.zip }}</p>
          <p>{{ house.location.city }}</p>
        </div>

        <div class="element-container">
          <img src="../assets/images/ic_price@3x.png" alt="price logo" />
          <p>{{ house.price }}</p>
          <img src="../assets/images/ic_size@3x.png" alt="size logo" />
          <p>{{ house.size }}m&sup2;</p>
          <img
            src="../assets/images/ic_construction_date@3x.png"
            alt="location logo"
          />
          <p>Built in {{ house.constructionYear }}</p>
        </div>

        <div class="element-container">
          <img src="../assets/images/ic_bed@3x.png" alt="bedroom" />
          <p>{{ house.rooms.bedrooms }}</p>
          <img src="../assets/images/ic_bath@3x.png" alt="bathroom" />
          <p>{{ house.rooms.bathrooms }}</p>
          <img src="../assets/images/ic_garage@3x.png" alt="bathroom" />
          <p>{{ house.hasGarage ? "Yes" : "No" }}</p>
        </div>

        <p>{{ house.description }}</p>

        <div v-if="house.madeBy === userEmail" class="icon-container">
          <RouterLink :to="`/houses/${house._id}/edit`">
            <img
              class="edit-icon"
              src="../assets/images/ic_edit@3x.png"
              alt="edit icon"
            />
          </RouterLink>

          <img
            class="delete-icon"
            src="../assets/images/ic_delete@3x.png"
            alt="delete icon"
            @click="houseStore.openDeleteDialog"
          />

          <DeleteDialog v-if="showDeleteDialog" :houseId="house._id" />
        </div>
      </div>
    </div>
    <RecommendedHouses :houseId="house._id" />
  </div>
</template>

<script setup>
import { useHouseStore } from "../stores/HouseStore";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import RecommendedHouses from "../components/RecommendedHouses.vue";
import DeleteDialog from "../components/DeleteDialog.vue";
import { storeToRefs } from "pinia";

const houseStore = useHouseStore();
const route = useRoute();
const router = useRouter();

const { showDeleteDialog, userEmail } = storeToRefs(houseStore);

const houseId = (route.params.id);
// console.log(typeof houseId)
const house = computed(() => houseStore.getHouseById(houseId));


onMounted(async () => {
  await houseStore.getHouses();
});
</script>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";

.house-detail-page-container {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 12rem;
  padding-top: 3rem;

  .details-container {
    width: 55%;
    background-color: $background-color-2;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .house-detail-image {
      width: 100%;
    }

    .content-container {
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 2rem 2rem;
      gap: 1rem;

      p {
        color: $text-primary-color;
        font-family: $font-family-open-sans;
        font-size: $listing-information-desktop;
        margin-right: 1.6rem;
      }

      #zip {
        margin-right: 0.5rem;
      }

      img {
        width: 1.2rem;
        margin-right: 0.4rem;
      }

      .element-container {
        display: flex;
        align-items: center;
      }
    }
  }
}

@media (min-width: 479px) {
  .mobile-icon-container {
    display: none;
  }
}

@media (max-width: 1220px) {
  .house-detail-page-container {
    .details-container {
      width: 70vw;
    }
  }
}

@media (max-width: 479px) {
  .icon-container {
    display: none;
  }

  .house-detail-page-container {
    padding: 0;

    .mobile-icon-container {
      position: absolute;
      top: 4rem;
      right: 2rem;
      z-index: 2;

      .edit-icon {
        width: 1.8rem;
        margin-right: 1.5rem;

      }

      .delete-icon{
        width: 1.2rem;
      }
    }

    .details-container {
      position: relative;
      width: 100vw;

      .content-container {
        top: -1rem;
        background-color: $background-color-2;
        border-radius: 1rem;
        padding: 1rem 1rem;
        padding-right: 0;
        gap: 0.8rem;

        p {
          font-size: $listing-information-mobile;
          margin-right: 1.3rem;
          line-height: 1.6;
        }

        #zip {
          margin-right: 0.3rem;
        }

        img {
          width: 0.8rem;
        }
      }
    }
  }
}
</style>