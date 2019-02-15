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
          <div :class="`col-${$mq === 'md' ? 12 : 9}`" :style="allNews.length > 0 ? `--color:${color}` : ''">
            <div class="row each" v-for="news of allNews" :key="news.id" v-on:click="showNews(news.id)">
              <div class="col-md-4 text-center full-height">
                <img class="img-news" v-if="news.images.length > 0" :src="news.images[0].src">
              </div>
                <div class="col-md-8">
                  <h3 :style="`color:${color}`">{{news.headline}}</h3>
                  <p>{{news.abstract}}</p>
                </div>
              </div>
            </div>
            <div class="col-3" v-if="allNews.length > 0 && $mq != 'md'">
              <Ad type="vertical"></Ad>
              <Highlights></Highlights>
            </div>
            <Pagination :pagination="pagination" :length_object="allNews.length" :color="color" :category="category" pageName="NewsByCategory"></Pagination>
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
  import Highlights from "./../components/Highlights.vue";
  import Ad from "./../components/Ad.vue";
  import Pagination from "./../components/Pagination.vue";
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
      Ad,
      Highlights,
      Pagination
    },
    data() {
      return {
        loader: true,
        allNews: [],
        color: "",
        news_page: 10,
        pagination: undefined
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
      if (this.page == 0)
        this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: 1 } });
      this.$http.post(`${this.$apiURL}/news/byTagByCategory?page=${this.page}&pageSize=${this.news_page}`, {
        tag: 'notícia',
        category: this.category
      }).then(
        res => {
          if (res.data.pagination.pageCount < this.page && res.data.pagination.pageCount > 0)
            this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: res.data.pagination.pageCount } });
          this.allNews = res.data.news;
          this.pagination = res.data.pagination;
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
      // TO DO: remove
      newsPerPage: function () {
        let aux = this.news_page * this.page - this.news_page;
        let arrNews = this.allNews.slice(aux, aux + this.news_page > this.allNews.length ? this.allNews.length : aux + this.news_page);

        return arrNews;
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
  
  .full-height {
    height: 100%;
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