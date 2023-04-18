<template>
  <div class="about-container">
    <h1 class="mobile-title">About</h1>
    <h1 class="desk-sbutitle">About DTT Real Estate</h1>
    <h2 class="mobile-sbutitle">About DTT Real Estate</h2>
    <p>
      This real estate web app allows users to view, search, create, and delete
      house listings. <br /><br />
      Navigation is made easy with a fixed header, while the homepage displays
      all available houses and allows for easy search by criteria like location
      and number of bedrooms and bathrooms. <br /><br />
      Users can also sort listings by their preference, such as price or size,
      and view details like address, description, image, and more. <br /><br />
      Listing owners can create, edit, and delete listings using a required form
      with error messaging for incomplete submissions. This comprehensive
      platform caters to both buyers and sellers.
    </p>

    <h1 class="desk-sbutitle">Design and Development</h1>
    <h2 class="mobile-sbutitle">Design and Development</h2>

    <div class="middle-container">
      <img src="../assets/images/img_logo_dtt@3x.png" alt="DTT logo" />

      <div class="content-container">
        <p>By DTT</p>
        <a href="https://www.d-tt.nl/en/" target="_blank">www.d-tt.nl</a>
      </div>
    </div>

    <div class="intro-container">
      <p>
        DTT is not your average software development company because besides
        technical knowledge we also have a solid marketing background. With
        passion, we work on a perfect mix of technology, strategy, and
        creativity. DTT was established in 2010, and in a short period we have
        made significant steps forward; a substantial portfolio, excellent
        credentials, respectable clients, and most importantly a competent and
        driven team.
      </p>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@import "../assets/scss/style.scss";

.about-container {
  @media (min-width: 479px) {
    .mobile-title,
    .mobile-sbutitle {
      display: none;
    }
  }

  display: flex;
  flex-direction: column;
  
  padding: 3rem 12rem;
  padding-top: 6rem;
  gap: 2rem;

  p {
    line-height: 1.4;
    font-family: $font-family-open-sans;
    font-size: $body-text-desktop;
  }

  .middle-container {
    display: flex;
    width: 27rem;
    align-items: center;

    img {
      width: 50%;
    }

    .content-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 2rem;
      font-family: $font-family-open-sans;

      a {
        color: $hyperlink-color;
      }
    }
  }
}

@media (max-width: 479px) {
  .desk-sbutitle {
    display: none;
  }

  .mobile-title {
    text-align: center;
    
  }
  .about-container {
    display: flex;
    flex-direction: column;
    padding: 3rem 1.5rem;
    padding-bottom: 5rem;
    gap: 1rem;

    .mobile-sbutitle {
      margin-top: 1.5rem;
    }


    p {
      line-height: 1.5;
      font-size: $body-text-mobile;
    }

    .middle-container {
      width: 100%;
      align-items: center;

      img {
        width: 25%;
      }

      .content-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 1rem;
        font-family: $font-family-open-sans;
        font-size: $body-text-mobile;

        a {
          color: $hyperlink-color;
        }
      }
    }
  }
}
</style>
