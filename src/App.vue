<template>
  <div class="nav">
    <a href="https://www.d-tt.nl/en/" target="_blank">
      <img src="./assets/images/img_logo_dtt@3x.png" alt="DTT logo" />
    </a>

    <RouterLink
      to="/"
      class="nav-house"
      :class="{ selected: $route.path !== '/about' }"
      >Houses</RouterLink
    >
    <RouterLink
      to="/about"
      class="nav-about"
      :class="{ selected: $route.path === '/about' }"
      >About</RouterLink
    >
  </div>

  <div class="mobile-container">
    <div class="mobile-nav">
      <div class="image-container">
        <RouterLink
          to="/"
          class="nav-house"
          :class="{ selected: $route.path !== '/about' }"
        >
          <img
            src="../src/assets/images/ic_mobile_navigarion_home_active@3x.png"
            class="house-logo"
            alt="house logo"
          />
        </RouterLink>
      </div>
      <div class="image-container">
        <RouterLink
          to="/about"
          class="nav-about"
          :class="{ selected: $route.path === '/about' }"
        >
          <img
            src="../src/assets/images/ic_mobile_navigarion_info@3x.png"
            class="info-logo"
            alt="info logo"
          />
        </RouterLink>
      </div>
    </div>
  </div>

  <RouterView />
</template>

<script setup>
</script>

<style lang='scss' scoped>
@import "./assets/scss/style.scss";

.nav {
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
    width: 7rem;
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

  &-about {
    font-size: $desktop-header-inactive-menu;
    color: $tertiary-color-dark;
    margin-left: 4rem;
  }

  &-house:hover,
  &-about:hover {
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
}
</style>
