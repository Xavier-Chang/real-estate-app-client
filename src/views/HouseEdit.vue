<template>
  <div class="edit-container">
    <RouterLink :to="`/houses/${houseId}`">
      <div class="desk-back-home-container">
        <img
          src="../assets/images/ic_back_grey@3x.png"
          alt="back to detail page"
          @click="houseStore.clearUrl"
        />
        <p>Back to detail page</p>
      </div>
    </RouterLink>

    <RouterLink :to="`/houses/${houseId}`">
      <div class="mobile-back-home-container">
        <img
          src="../assets/images/ic_back_grey@3x.png"
          alt="back to detail page"
        />
      </div>
    </RouterLink>

    <h1>Edit listing</h1>
    <div class="form-container">
      <EditHouseForm :house-id="houseId" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import EditHouseForm from "../components/EditHouseForm.vue";
import { useHouseStore } from "../stores/HouseStore";

const houseStore = useHouseStore();
const route = useRoute();
const houseId = route.params.id;
// const houseId = typeof route.params.id === "string" ? parseInt(route.params.id, 10) : route.params.id;
// console.log(typeof houseId)
</script>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";
.edit-container {
  background-image: url("../assets/images/img_background@3x.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  margin-top: 0;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0 12em;
  padding-top: 3rem;

  h1 {
    margin-bottom: 2rem;
  }

  .form-container {
    width: 24rem;
    display: flex;
  }
}

@media (max-width: 479px) {
  .edit-container {
    background-image: url("../assets/images/img_background@3x.png");
    background-size: contain;
    background-position: center bottom;
    padding: 0 1em;

    .mobile-back-home-container {
      margin-top: 2rem;
      margin-left: 1rem;
    }

    h1 {
      margin-top: 2rem;
      text-align: center;
    }

    .form-container {
      width: 90vw;
      padding-bottom: 10rem;
    }
  }
}
</style>

