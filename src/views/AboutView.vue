<template>
  <div class="about-container">
    <h1 class="mobile-title">About</h1>
    <h1 class="desk-sbutitle">About Xavier Real Estate App</h1>
    <h2 class="mobile-sbutitle">About Xavier Real Estate App</h2>
    <p>
      This real estate web app allows users to view, search, create, and delete
      house listings. <br /><br />
      The app features a responsive design, making it accessible on desktops and smartphones.
      <br /><br />
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
      <img src="../assets/images/xavier.jpg" alt="Xavier Chang" />

      <div class="content-container">
        <h2><span>By</span> Xavier Chang</h2>
        <a href="https://www.linkedin.com/in/xavier-laiinchang/" target="_blank"
          >LinkedIn</a
        >
        <a href="https://github.com/Xavier-Chang" target="_blank">Github</a>
        <a href="mailto:xavierchanglaiin@gmail.com" target="_blank">Email</a>
      </div>
    </div>

    <div class="intro-container">
      <p>
        I'm a <strong> Full-Stack Developer </strong> with a background in social work, bringing
        unique problem-solving skills and teamwork abilities to the tech
        industry. I have experience in <strong> JavaScript (ES6), HTML5, CSS, SASS, MERN
        stack (MongoDB, Express.js, React.js, Node.js), and Vue.js </strong>. I'm
        passionate about continuous learning and growth.
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
      width: 30%;
    }

    .content-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 2rem;
      font-family: $font-family-open-sans;

      h2 {
        font-weight: lighter;

        span {
          font-size: $body-text-desktop;
        }
      }

      a {
        color: $hyperlink-color;
      }

      a:hover {
        color: red;
        transform: scale(1.05);
      }
    }
  }
  .intro-container{
      p{
        strong {
        color: rgba(241, 71, 71, 0.927);
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

        h2 {
          span {
            font-size: $body-text-mobile;
          }
        }

        a {
          color: $hyperlink-color;
        }
      }
    }
  }
}
</style>
