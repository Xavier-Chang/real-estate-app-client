<template>
  <div class="delete-dialog">
    <div class="delete-dialog-content">
      <h2>Delete listing</h2>
      <p>Are you sure want to delete this listing? <br>
      This action cannot be undone.</p>
      <div class="delete-buttons-container">
        <button @click="handleConfirmDelete">YES, DELETE</button>
        <button class="cancel-btn" @click="houseStore.closeDeleteDialog">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useHouseStore } from "../stores/HouseStore";

const houseStore = useHouseStore();
const router = useRouter();

const props = defineProps({
  houseId: {
    type: String,
  }
});

const handleConfirmDelete = () => {
  houseStore.deleteHouse(props.houseId, router);
  houseStore.closeDeleteDialog();
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/style.scss";

.delete-dialog {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;

  .delete-dialog-content {
    background-color: $background-color-2;
    position: absolute;
    text-align: center;
    width: 23rem;
    height: 12rem;
    top: 50%;
    left: 50%;
    gap: 1rem;
    transform: translate(-50%, -50%);
    padding: 3rem 6rem;
    padding-bottom: 4.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);


    p {
      font-family: $font-family-open-sans;
      font-size: $body-text-desktop;
      margin: 2rem 0;
    }

    .delete-buttons-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;

      button {
        background-color: $primary-color;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: lighter;
  

        &:hover {
          transform: scale(1.05);
        }
      }

      .cancel-btn{
        background-color: $secondary-color;
      }
    }
  }
}

@media (max-width: 479px) {
  .delete-dialog {

  .delete-dialog-content {
    background-color: $background-color-2;
    position: absolute;
    text-align: center;
    width: 90vw;
    height: 20vh;
    top: 50%;
    left: 50%;
    gap: 1rem;
    transform: translate(-50%, -50%);
    padding: 1rem 0;
    padding-bottom: 4.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h2 {
      margin-top: 1rem;
    }

    p {
      font-family: $font-family-open-sans;
      font-size: $body-text-mobile;
      margin: 1.5rem 0;
      margin-bottom: 2rem;
    }

    .delete-buttons-container {   
      padding: 0 5rem;  

      button {
        background-color: $primary-color;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-weight: lighter;
      }

      .cancel-btn{
        background-color: $secondary-color;
      }
    }
  }
}
}
</style>