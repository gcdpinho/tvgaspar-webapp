<template>
  <div class="newsByCategory">
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar></Navbar>
    <section id="slider">
      <Slider type="news" :category="category"></Slider>
    </section>
    <section id="news-vertical">
      <div class="row">
        <div class="col-10">
          <div class="row" v-for="news of allNews" :key="news.id">
            <div class="col-4">
              <img v-if="news.images.length > 0" :src="news.images[0].src">
            </div>
            <div class="col-8">
              <h3>{{news.headline}}</h3>
              <p>{{news.abstract}}</p>
            </div>
          </div>
        </div>
        <div class="col-8"></div>
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
  import firebase from 'firebase';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

  export default {
    name: "NewsByCategory",
    props: {
      category: ""
    },
    components: {
      Navbar,
      Footer,
      Slider,
      ClipLoader,
      Ad
    },
    data() {
      return {
        loader: true,
        allNews: []
      }
    },
    mounted() {
      this.$http.post(`${this.$apiURL}/news/byTagByCategory`, {
        tag: 'notícia',
        category: this.category
      }).then(
        res => {
          this.allNews = res.data;
          console.log(this.allNews);
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
    watch: {
      '$route.category'(category) {
        this.category = category;
      }
    }
  }
</script>

<style scoped>
  .newsByCategory {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  #news-vertical img{
    width: 100%;
  }
</style>