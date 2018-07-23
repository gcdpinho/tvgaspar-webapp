<template>
  <div id="app">
    <Navbar></Navbar>
    <section id="news">
      <div class="container">
        <div class="header">
          <div class="news-title">
            Notícias
          </div>
          > Últimas Notícias
        </div>
        <div class="inner-news">
          <div class="row">
            <div class="col-4" v-for="news of allNews" :key="news.id">
              <div class="each-news" v-bind:style="news.categories.length > 0 ? '--color:'+news.categories[0].color : ''">
                <div class="img-news text-center">
                  <img src="/img/logo.012bdd80.png">
                  <span v-if="news.categories.length > 0" class="category">{{news.categories[0].category}}</span>
                </div>
                <div class="inner">
                  <h3>{{news.headline}}</h3>
                  <p>{{news.abstract}}</p>
                </div>
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
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      allNews: null
    };
  },
  mounted() {
    this.$http.get(`${this.$apiURL}/news/byApproval`).then(
      res => {
        this.allNews = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style>
html {
  overflow-x: hidden;
  height: 100%;
}
body {
  height: 100%;
}
section {
  padding: 30px 0;
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

.news-title {
  display: inline-block;
  background-color: #d4000e;
  padding: 5px 10px;
  color: white;
}
.inner-news {
  margin-top: 30px;
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
}
.img-news {
  position: relative;
}
.each-news .img-news:hover {
  opacity: 0.8;
}
.each-news h3 {
  margin: 0;
  position: relative;
  font-size: 1.5rem;
}
.inner {
  padding: 0 30px 30px;
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
  padding: 5px;
  left: 0;
  background-color: var(--color);
  color: white;
}
</style>
