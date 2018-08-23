<template>
  <div id="newsById">
    <p class="text-loader" v-if="loader">Aguarde ...</p>
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar :color="color"></Navbar>
    <section id="news-datail" v-if="news">
      <div class="container">
        <div class="row">
          <div :class="`col-${$mq === 'md' ? 12 : 9}`">
            <div class="title">
              <h2 class="text-center">{{news.headline}}</h2>
              <p class="text-center">{{news.subtitle}}</p>
            </div>
            <div class="author">
              <p class="bold">{{news.author}}</p>
              <p>{{$moment(news.created_at).format('DD/MM/YYYY hh:mm')}}</p>
            </div>
            <div v-html="news.body"></div>
          </div>
          <div class="col-3" v-if="$mq != 'md'">
            <Ad type="vertical"></Ad>
            <div class="inner-destaque">
              <p class="title-destaques">Destaques</p>
              <div class="row each-destaque" v-for="destaque of news_destaque" :key="destaque.id" v-on:click="showNews(destaque.id)" :style="color != '' ? `--color:${color}` : '--color: #9d3138'">
                <img class="img-news" v-if="destaque.images.length > 0" :src="destaque.images[0].src">
                <p>{{destaque.headline}}</p>
              </div>
            </div>
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
    name: "NewsById",
    props: {
      id: undefined
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
        color: "",
        news: undefined,
        limit_news: 5,
        news_destaque: undefined,
        imageTemplate: `<div class="img-news-detail">
                          <img src="src-img" />
                        </div>`,
        videoTemplate: `<div class="video-news-detail">
                          <iframe width="100%" height="100%" src="src-video"></iframe>
                        </div>`

      }
    },
    mounted() {
      this.$http.get(`${this.$apiURL}/news/${this.id}`).then(res => {
        this.news = res.data[0];
        if (this.news.categories.length > 0) {
          this.color = this.news.categories[0].color;
          this.$http.post(`${this.$apiURL}/news/byTagByCategory`, {
            tag: "slider",
            category: this.news.categories[0].category
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
        }

        this.changeTags('<video>', '</video>', "video");
        this.changeTags('<img>', '</img>', "image");
      },
        err => {
          // eslint-disable-next-line
          console.log(err);
          this.loader = false;
        }
      );

    },
    methods: {
      changeTags: function (openTag, closeTag, type) {
        this.news.body = this.news.body.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        Promise.all(
          this.news.body.split(openTag).map(element => {
            var e = element.split(closeTag);
            if (e.length > 1)
              switch (type) {
                case "image":
                  firebase.storage().ref().child(`imagens/${e[0]}`).getDownloadURL()
                    .then(img =>
                      this.news.body = this.news.body.replace(`${openTag}${e[0]}${closeTag}`, this.imageTemplate.replace('src-img', img))
                    )
                    .catch(err => {
                      // eslint-disable-next-line
                      console.log(err);
                      this.loader = false;
                    });
                  break;
                case "video":
                  this.news.body = this.news.body.replace(`${openTag}${e[0]}${closeTag}`, this.videoTemplate.replace('src-video', e[0]))
                  break;
              }
          })
        ).then(this.loader = false)
          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
            this.loader = false;
          });
      },
      showNews: function (idNews) {
        this.$router.push({ name: "NewsById", params: { id: idNews } })
      }
    }
  }
</script>

<style scoped>
  #newsById {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  h2 {
    font-weight: bold;
  }
  .title p {
    font-size: 1.2rem;
    font-weight: 400;
  }
  .author {
    margin-bottom: 30px;
  }
  .author p {
    margin-bottom: 0;
    font-size: 0.8rem;
  }
  .author p.bold {
    font-weight: bold;
  }
  .img-news {
    width: 100%;
    height: 100px;
  }
  .inner-destaque {
    margin-top: 10px;
  }
  .title-destaques {
    font-weight: bold;
    font-size: 16px;
  }
  .each-destaque:hover img {
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
</style>