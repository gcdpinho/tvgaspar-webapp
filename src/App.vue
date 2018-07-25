<template>
  <div id="app">
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar></Navbar>
    <section id="slider">
      <Slider type="news"></Slider>
    </section>
    <section id="news">
      <div class="container">
        <div class="header">
          <div class="header-title">
            Notícias
          </div>
          > Últimas Notícias
        </div>
        <div class="inner-news">
          <div class="row">
            <div class="col-4" v-for="news of allNews" :key="news.id">
              <div class="each-news" v-bind:style="news.categories.length > 0 ? '--color:'+news.categories[0].color : ''">
                <div class="img-news text-center">
                  <img v-if="news.images.length > 0" :src="news.images[0].src">
                  <span v-if="news.categories.length > 0" class="category">{{news.categories[0].category}}</span>
                </div>
                <div class="inner">
                  <h3>{{news.headline}}</h3>
                  <p>{{news.abstract}}</p>
                </div>
                <div class="footer-news"></div>
              </div>
            </div>
          </div>
          <div class="horizontal-ad">
            <Ad type="horizontal" :index="0"></Ad>
          </div>
        </div>
      </div>
    </section>
    <section id="slider-images">
      <div class="container">
        <div class="header">
          <div class="header-title">
            TV Gaspar
          </div>
          > Parceiros
        </div>
        <Slider type="images"></Slider>
      </div>
    </section>
    <section id="gallery-videos">
      <Gallery type="videos"></Gallery>
    </section>
    <Ad type="body" :index="0"></Ad>
    <section id="columnist">
      <Slider type="news-columnist"></Slider>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar.vue";
  import Footer from "./components/Footer.vue";
  import Slider from "./components/Slider.vue";
  import Ad from "./components/Ad.vue";
  import Gallery from "./components/Gallery.vue";
  import firebase from 'firebase';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';


  export default {
    name: "app",
    components: {
      Navbar,
      Footer,
      Slider,
      ClipLoader,
      Ad,
      Gallery
    },
    data() {
      return {
        allNews: [],
        loader: true
      };
    },
    mounted() {
      this.$http.post(`${this.$apiURL}/news/byTag`, {
        tag: 'notícia'
      }).then(
        res => {
          this.allNews = res.data;
          Promise.all(this.allNews.map(news =>
            news.images.map(image =>
              firebase.storage().ref().child(`imagens/${image.src}`).getDownloadURL()
                .then(img => {
                  image.src = img;
                })
            )
          )).then(
            this.loader = false
          );
        },
        err => {
          // eslint-disable-next-line
          console.log(err);
        }
      );
    },
  };
</script>

<style>
  html {
    /* overflow-x: hidden; */
    height: 100%;
  }
  body {
    height: 100%;
  }
  section {
    padding: 30px 0;
  }
  div.row{
    margin-right: 0;
    margin-left: 0;
  }
  #app {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #49494d;
  }
  .header {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 1.3rem;
  }

  .header-title {
    display: inline-block;
    background-color: #d4000e;
    padding: 5px 10px;
    color: white;
  }
  .inner-news {
    margin-top: 30px;
  }
  .inner-news .col-4 {
    margin-bottom: 30px;
  }
  #news {
    background-color: #ececed;
  }
  .each-news {
    background-color: #f4f4f6;
    cursor: pointer;
  }
  .each-news img {
    height: 200px;
    max-width: 100%;
  }
  .img-news {
    position: relative;
    height: 200px;
  }
  .each-news .img-news:hover {
    opacity: 0.8;
  }
  .each-news h3 {
    margin: 0;
    position: relative;
    font-size: 1.2rem;
  }
  .inner {
    padding: 10px 30px 0;
    height: 200px;
    overflow: hidden;
  }
  .each-news h3:hover {
    color: var(--color);
  }
  .each-news h3:before {
    bottom: 0px;
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    width: 70px;
    background-color: var(--color);
    left: 2px;
  }
  .each-news h3::after {
    background: rgba(133, 133, 133, 0.5);
    content: "";
    display: block;
    height: 2px;
    margin: 5px 2px;
    width: 120px;
    max-width: 100%;
  }
  .each-news p {
    margin-bottom: 0;
  }
  .each-news p:hover {
    color: var(--color);
  }
  .category {
    position: absolute;
    bottom: 0;
    margin: 15px;
    padding: 3px 8px;
    text-transform: uppercase;
    left: 0;
    background-color: var(--color);
    color: white;
  }
  .footer-news {
    padding-bottom: 30px;
  }
  section#slider {
    padding: 0;
  }
  .VueCarousel-pagination {
    position: absolute;
    bottom: 0;
  }
  .VueCarousel-navigation-prev {
    left: 40px !important;
    color: white !important;
    font-size: 1.5rem;
  }
  .VueCarousel-navigation-next {
    right: 40px !important;
    color: white !important;
    font-size: 1.5rem;
  }
  .v-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }
  .v-clip {
    margin: auto;
    border-width: 8px !important;
  }
  .horizontal-ad {
    max-width: 728px;
    margin: auto;
  }
  #slider-images .header{
    margin-bottom: 30px;
  }
  #gallery-videos{
    background: #141417;
  }
</style>
