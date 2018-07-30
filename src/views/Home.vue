<template>
  <div id="home">
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
          <div class="row" v-for="r in Math.ceil(allNews.length/news_line)" :key="r">
            <div :class="`col col-${12/news_line}`" v-for="news of allNews.slice((r-1)*news_line, allNews.length>(r-1)*news_line + news_line ? (r-1)*news_line + news_line : allNews.length)" :key="news.id">
              <div class="each-news" :style="news.categories.length > 0 ? '--color:'+news.categories[0].color : ''">
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
            <div v-if="r%lines_ad == 0" class="horizontal-ad col col-12">
              <Ad type="horizontal" :index="r/lines_ad-1"></Ad>
            </div>
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
      <div class="container">
        <div class="header">
          <div class="header-title">
            Notícias
          </div>
          > Colunistas
        </div>
        <Slider type="news-columnist"></Slider>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
  import Navbar from "./../components/Navbar.vue";
  import Footer from "./../components/Footer.vue";
  import Slider from "./../components/Slider.vue";
  import Ad from "./../components/Ad.vue";
  import Gallery from "./../components/Gallery.vue";
  import firebase from 'firebase';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

  export default {
    name: "Home",
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
        loader: true,
        lines_ad: 2,
        news_line: 3
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
    }
  }

</script>

<style scoped>
  #home {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  section#slider {
    padding: 0;
  }
  #slider-images .header,
  #columnist .header {
    margin-bottom: 30px;
  }
  #gallery-videos {
    background: #141417;
  }
  #columnist .header-title {
    background-color: #ff9800;
  }
  #slider-images .header-title {
    background-color: #4b25e4;
  }
  #gallery-videos .header-title {
    background-color: white;
    color: #0e0e0e;
  }
</style>
