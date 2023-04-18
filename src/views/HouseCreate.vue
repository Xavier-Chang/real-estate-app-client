<template>
  <div class="create-container">
    <RouterLink to="/">
      <div class="desk-back-home-container">
        <img
          src="../assets/images/ic_back_grey@3x.png"
          alt="back to overview"
          @click="houseStore.clearUrl"
        />
        <p>Back to overview</p>
      </div>
    </RouterLink>

    <RouterLink to="/">
      <div class="mobile-back-home-container">
        <img
          src="../assets/images/ic_back_grey@3x.png"
          alt="back to overview"
        />
      </div>
    </RouterLink>
    <h1>Create new listing</h1>
    <div class="form-container">
      <CreateHouseForm />
    </div>
  </div>
</template>

<script setup>
import CreateHouseForm from "../components/CreateHouseForm.vue";
import { useHouseStore } from "../stores/HouseStore";
const houseStore = useHouseStore();
</script>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";

.create-container {
  background-image: url("../assets/images/img_background@3x.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  margin-top: 0;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0 12rem;
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
  .create-container {
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