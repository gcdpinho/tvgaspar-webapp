<template>
  <div class="newsByCategory">
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar :color="color"></Navbar>
    <section id="slider" v-if="category != 'Colunista'">
      <Slider type="news" :category="category"></Slider>
    </section>
    <section id="news-vertical">
      <div class="container">
        <div class="row">
          <div class="col-10" :style="allNews.length > 0 ? `--color:${color}` : ''">
            <div class="row each" v-for="news of allNews" :key="news.id">
              <div class="col-4 text-center">
                <img v-if="news.images.length > 0" :src="news.images[0].src">
              </div>
              <div class="col-8">
                <h3 :style="`color:${color}`">{{news.headline}}</h3>
                <p>{{news.abstract}}</p>
              </div>
            </div>
          </div>
          <div class="col-2" v-if="allNews.length > 0">
            <Ad type="vertical" :index="0"></Ad>
          </div>
        </div>
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
        allNews: [],
        color: ""
      }
    },
    mounted() {
      this.$http.post(`${this.$apiURL}/category`, {
        category: this.category
      }).then(res => {
        if (res.data.length > 0)
          this.color = res.data[0].color;
      },
        err => {
          // eslint-disable-next-line
          console.log(err);
        }
      );

      this.$http.post(`${this.$apiURL}/news/byTagByCategory`, {
        tag: 'notícia',
        category: this.category
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
  #news-vertical img {
    max-width: 100%;
    height: 100%;
  }
  .each {
    height: 250px;
    padding: 30px 0;
    border-bottom: 1px solid #d6dadd;
    cursor: pointer;
  }
  .each p:hover {
    color: var(--color);
  }

  .each img:hover{
    opacity: 0.8;
  }
  .each:last-child {
    border-bottom: none;
  }
  .each h3 {
    margin-bottom: 20px;
  }
</style>