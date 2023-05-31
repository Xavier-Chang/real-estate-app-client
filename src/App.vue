<template>
  <div class="nav">
    <RouterLink to="/">
      <img src="./assets/images/house-logo.jpeg" alt="DTT logo" />
    </RouterLink>

    <RouterLink to="/" class="nav-house"
      :class="{ selected: $route.path !== '/about' && $route.path !== '/register' && $route.path !== '/signin' }">Houses
    </RouterLink>
    <RouterLink to="/register" class="nav-register" :class="{ selected: $route.path === '/register' }" v-if="!isLoggedIn">
      Register
    </RouterLink>
    <RouterLink to="/signin" class="nav-signin" :class="{ selected: $route.path === '/signin' }" v-if="!isLoggedIn">Signin
    </RouterLink>
    <RouterLink to="/about" class="nav-about" :class="{ selected: $route.path === '/about' }">About</RouterLink>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
    <p v-if="userEmail"><strong>Welcome:</strong>  {{ userEmail }}</p>
  </div>

  <div class="mobile-container">
    <div class="mobile-nav">
      <div class="image-container">
        <RouterLink to="/" class="nav-house" :class="{ selected: $route.path !== '/about' }">
          <img src="../src/assets/images/ic_mobile_navigarion_home_active@3x.png" class="house-logo" alt="house logo" />
        </RouterLink>
      </div>
      <div class="image-container">
        <RouterLink to="/about" class="nav-about" :class="{ selected: $route.path === '/about' }">
          <img src="../src/assets/images/ic_mobile_navigarion_info@3x.png" class="info-logo" alt="info logo" />
        </RouterLink>
      </div>
    </div>
  </div>

  <RouterView />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useHouseStore } from "./stores/HouseStore";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { onMounted } from "vue";
import router from "./router";

const houseStore = useHouseStore();
const { userEmail, isLoggedIn } = storeToRefs(houseStore);


const auth = getAuth();
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      userEmail.value = user.email;
      isLoggedIn.value = true;
    } else {
      // No user is signed in.
      isLoggedIn.value = false;
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    userEmail.value = '';
    router.push('/')
  })
}

</script>

<style lang='scss' scoped>
@import "./assets/scss/style.scss";

.nav {
  position: relative;

  p {
    font-family: "Montserrat", sans-serif;
    position:fixed;
    right: 25rem;
    color: $text-primary-color;
  }

  button {
    color: white;
    position: fixed;
    right: 12.5rem;
  }

  @media (max-width: 480px) {
    display: none;
  }

  display: flex;
  position: fixed;
  width: 100%;
  background-color: $background-color-2;
  padding: 0.5rem 12rem;
  align-items: center;
  justify-content: start;
  font-family: $font-family-montserrat;
  z-index: 10;

  img {
    width: 6rem;
  }

  img:hover {
    transform: scale(1.05);
  }

  .selected {
    color: black;
    font-weight: bold;
    color: $text-primary-color;
    transform: scale(1.02);
  }

  &-house {
    font-size: $desktop-header-active-menu;
    color: $tertiary-color-dark;
    margin-left: 3rem;
  }

  &-about,
  &-register,
  &-signin {
    font-size: $desktop-header-inactive-menu;
    color: $tertiary-color-dark;
    margin-left: 4rem;
  }


  &-house:hover,
  &-about:hover,
  &-register:hover,
  &-signin:hover {
    color: $hyperlink-color;
    transform: scale(1.02);
  }

}

.mobile-container {
  @media (min-width: 479px) {
    display: none;
  }

  .mobile-nav {
    display: flex;
    position: fixed;
    justify-content: space-around;
    width: 100vw;
    background-color: $background-color-2;
    bottom: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    z-index: 1;

    .image-container {
      display: flex;

      img {
        width: 1.5rem;
        margin-right: 2.5rem;
      }
    }
  }
}</style>
