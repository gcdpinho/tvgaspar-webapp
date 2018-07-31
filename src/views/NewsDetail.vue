<template>
  <div id="newsById">
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar :color="color"></Navbar>
    <section id="news-datail">
      <div class="container">
        <div class="title">
          <h2 class="text-center">{{news.headline}}</h2>
          <p class="text-center">{{news.subtitle}}</p>
        </div>
        <div class="author">
          <p class="bold">{{news.author}}</p>
          <p>{{news.created_at}}</p>
        </div>
        <div v-html="news.body"></div>
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
      category: "",
      news: undefined
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
        color: ""
      }
    },
    mounted() {
      this.$http.post(`${this.$apiURL}/category`, {
        category: this.category
      }).then(res => {
        if (res.data.length > 0)
          this.color = res.data[0].color;
        this.loader = false;
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
  #newsById {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  h2{
    font-weight: bold;
  }
  .title p{
    font-size: 1.2rem;
    font-weight: 400;
  }
  .author{
    margin-bottom: 30px;
  }
  .author p{
    margin-bottom: 0;
    font-size: 0.8rem;
  }
  .author p.bold{
    font-weight: bold;
  }
</style>