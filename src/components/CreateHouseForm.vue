<template>
  <form
    id="create-house-form"
    @submit.prevent="submitForm"
    enctype="multipart/form-data"
  >
    <label for="streetName">Street name*</label>
    <input
      type="text"
      required
      id="streetName"
      name="streetName"
      v-model="formData.streetName"
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
          v-model="formData.houseNumber"
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
          v-model="formData.numberAddition"
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
      v-model="formData.zip"
      placeholder="e.g. 1000 AA"
    />
    <label for="city">City*</label>
    <input
      type="text"
      required
      id="city"
      name="city"
      v-model="formData.city"
      placeholder="e.g. Utrecht"
    />

    <label for="housePicture">Upload picture (PNG or JPG)*</label>
    <div class="upload-container">
      <img
        v-if="!imageUrl"
        class="upload-logo"
        src="../assets/images/ic_upload@3x.png"
        alt="upload"
      />
      <img v-if="imageUrl" class="upload-image" :src="imageUrl" alt="upload" />
      <input
        type="file"
        required
        class="housePicture"
        id="housePicture"
        name="housePicture"
        ref="formData.housePicture"
        accept="image/*"
        @change="houseStore.onFileChange"
      />
      <img
        v-if="imageUrl"
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
      v-model="formData.price"
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
          v-model="formData.size"
          placeholder="e.g. 60m&sup2;"
          min="0"
        />
      </div>

      <div class="half-size-container">
        <label for="hasGarage">Garage*</label>
        <select required id="hasGarage" name="hasGarage" v-model="formData.hasGarage">
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
          v-model="formData.bedrooms"
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
          v-model="formData.bathrooms"
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
      v-model="formData.constructionYear"
      placeholder="e.g. 1990"
      min="1901"
      max="2023"
    />
    <label for="description">Description*</label>
    <textarea
      type="text"
      required
      id="description"
      name="description"
      v-model="formData.description"
      placeholder="Enter description"
    />

    <div v-if="formSubmitted && !houseStore.isFormValid" class="error-message">
      Required field missing
    </div>

    <div class="submit">
      <button
        class="sumbit-button"
        :style="{
          opacity: houseStore.isFormValid ? '1' : '',
        }"
        @click="formSubmitted = true"
        :disabled="!houseStore.anyFieldType || submittingForm"
      >
        <span v-if="submittingForm">Loading...</span>
        <span v-if="!submittingForm">POST</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useHouseStore } from "../stores/HouseStore";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

const houseStore = useHouseStore();
const router = useRouter();

const { formData, submittingForm, imageUrl, userEmail } = storeToRefs(houseStore);

const formSubmitted = ref(false);

function submitForm() {
  houseStore.handleSubmit(router);
}
</script>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";
.upload-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
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

  .clear-image {
    height: 2.5rem;
    z-index: 2;
    position: absolute;
    top: -1rem;
    right: -1rem;
    cursor: pointer;
  }
}

select:invalid {
  color: $tertiary-color-dark;
}

@media (max-width: 479px) {
  .upload-container {
    width: 5rem;
    height: 5rem;
    border: 0.3rem $tertiary-color-dark dashed;

    .upload-logo {
      width: 1.5rem;
    }
  }
}
</style>