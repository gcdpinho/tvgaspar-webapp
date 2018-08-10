<template>
  <div class="newsByCategory">
    <p class="text-loader" v-if="loader">Aguarde ...</p>
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar :color="color"></Navbar>
    <section id="slider" v-if="category != 'Colunista'">
      <Slider type="news" :category="category"></Slider>
    </section>
    <section id="news-vertical">
      <div class="container">
        <div class="row">
          <div :class="`col-${$mq === 'md' ? 12 : 10}`" :style="allNews.length > 0 ? `--color:${color}` : ''">
            <div class="row each" v-for="news of newsPerPage()" :key="news.id" v-on:click="showNews(news.id)">
              <div class="col-md-4 text-center">
                <img class="img-news" v-if="news.images.length > 0" :src="news.images[0].src">
              </div>
              <div class="col-md-8">
                <h3 :style="`color:${color}`">{{news.headline}}</h3>
                <p>{{news.abstract}}</p>
              </div>
            </div>
          </div>
          <div class="col-2" v-if="allNews.length > 0 && $mq != 'md'">
            <Ad type="vertical" :index="0"></Ad>
          </div>
          <div class="col-12 text-center buttons-pagination" v-if="allNews.length > 0 && this.news_page < allNews.length" :style="allNews.length > 0 ? `--color:${color}` : ''">
            <button v-on:click="newPage('previous')" class="ant">
              <v-icon>fa fa-angle-double-left</v-icon>
            </button>
            <button v-if="parseInt(page)-1 > 0" v-on:click="newPage(parseInt(page)-1)">{{parseInt(page)-1}}</button>
            <button v-on:click="newPage(page)" class="active">{{page}}</button>
            <button v-if="parseInt(page)+1 <= Math.ceil(this.allNews.length/this.news_page)" v-on:click="newPage(parseInt(page)+1)">{{parseInt(page)+1}}</button>
            <button v-on:click="newPage('next')" class="prox">
              <v-icon>fa fa-angle-double-right</v-icon>
            </button>
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
      category: "",
      page: 0
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
        color: "",
        news_page: 10
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
          if (Math.ceil(this.allNews.length / this.news_page) < this.page || this.page <= 0)
            this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: 1 } });
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
          this.loader = false;
        }
      );
    },
    watch: {
      '$route.category'(category) {
        this.category = category;
      }
    },
    methods: {
      showNews: function (idNews) {
        this.$router.push({ name: "NewsById", params: { id: idNews } })
      },
      newsPerPage: function () {
        let aux = this.news_page * this.page - this.news_page;
        let arrNews = this.allNews.slice(aux, aux + this.news_page > this.allNews.length ? this.allNews.length : aux + this.news_page);

        return arrNews;
      },
      newPage: function (pagination) {
        switch (pagination) {
          case 'next':
            if (parseInt(this.page) + 1 <= Math.ceil(this.allNews.length / this.news_page))
              this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: parseInt(this.page) + 1 } });
            break;
          case 'previous':
            if (parseInt(this.page) - 1 > 0)
              this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: parseInt(this.page) - 1 } });
            break;
          default:
            this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: pagination } });
            break;
        }
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

  .each img:hover {
    opacity: 0.8;
  }
  .each:last-child {
    border-bottom: none;
  }
  .each h3 {
    margin-bottom: 20px;
  }
  .buttons-pagination button {
    background: transparent;
    color: var(--color);
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 5px 15px;
  }
  .buttons-pagination button:hover,
  button.active {
    font-size: 20px;
    font-weight: bold;
  }

  .buttons-pagination button:hover i {
    font-size: 20px;
    font-weight: bold;
  }
  button.ant {
    border-radius: 5px 0 0 5px;
  }
  button.prox {
    border-radius: 0 5px 5px 0;
  }
  @media (max-width: 767px) {
    #news-vertical img {
      height: auto;
    }
    .each {
      height: auto;
    }
  }
</style>