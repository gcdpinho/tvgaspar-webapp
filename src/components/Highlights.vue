<template>
  <div class="inner-destaque" v-if="news_destaque != undefined">
    <p class="title-destaques">Destaques</p>
    <div class="row each-destaque" v-for="destaque of news_destaque" :key="destaque.id" v-on:click="showNews($event, destaque.id)" :style="destaque.categories.length > 0 ? `--color:${destaque.categories[0].color}` : '--color: #9d3138'">
      <div class="container-img">
        <img class="img-destaques" v-if="destaque.images.length > 0" :src="destaque.images[0].src">
        <router-link v-if="destaque.categories.length > 0" class="category" :to="{path: `/NewsByCategory/${destaque.categories[0].category}`}">{{destaque.categories[0].category}}</router-link>
      </div>
      <p>{{destaque.headline}}</p>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: "Highlights",
    data() {
      return {
        limit_news: 5,
        news_destaque: undefined,
      }
    },
    mounted() {
      this.$http.post(`${this.$apiURL}/news/byTag`, {
        tag: "slider",
      }).then(res => {
        this.news_destaque = res.data.slice(0, this.limit_news);
        this.news_destaque.map(news =>
          news.images.map(image =>
            firebase.storage().ref().child(`imagens/${image.src}`).getDownloadURL()
              .then(img => {
                image.src = img;
              })
          )
        );
      }, err => {
        // eslint-disable-next-line
        console.log(err);
      });
    },
    methods: {
      showNews: function (e, idNews) {
        if (e.target.className != 'category')
          this.$router.push({ name: "NewsById", params: { id: idNews } })
      }
    }
  }
</script>

<style scoped>
  .inner-destaque {
    margin-top: 10px;
  }
  .title-destaques {
    font-weight: bold;
    font-size: 16px;
  }
  .each-destaque:hover .container-img {
    opacity: 0.8;
  }
  .each-destaque:hover p {
    color: var(--color);
  }
  .each-destaque {
    border-bottom: 1px solid #d6dadd;
    padding: 15px 0;
    cursor: pointer;
  }
  .each-destaque:last-child {
    border: none;
  }
  .inner-destaque p {
    margin-bottom: 0;
  }
  .container-img {
    position: relative;
  }
  .category {
    margin: 0;
  }
  .img-destaques {
    width: 100%;
    height: 100px;
  }
</style>

