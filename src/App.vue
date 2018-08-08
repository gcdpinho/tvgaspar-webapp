<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  export default {
    name: "app"
  };
</script>

<style>
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
  section {
    padding: 30px 0;
  }
  div.row {
    margin-right: 0;
    margin-left: 0;
  }
  #app {
    font-size: 14px;
    height: 100%;
    color: #49494d;
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
  .news-columnist .VueCarousel-navigation-prev {
    left: 0 !important;
    color: #141417 !important;
  }
  .news-columnist .VueCarousel-navigation-next {
    right: 0 !important;
    color: #141417 !important;
  }

  .v-clip {
    margin: auto;
    border-width: 8px !important;
  }
  .header {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 1.3rem;
  }

  .header-title {
    display: inline-block;
    background-color: #9d3138;
    padding: 5px 10px;
    color: white;
  }

  .inner-news {
    margin-top: 30px;
  }
  .inner-news .col {
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
  .category:hover {
    text-decoration: none;
    color: white;
  }
  .footer-news {
    padding-bottom: 30px;
  }
  .horizontal-ad {
    max-width: 728px;
    margin: auto;
  }
  #columnist .each-news {
    margin: 0 5px;
  }
  .img-news-detail {
    width: 100%;
    margin: 30px 0;
  }

  .img-news-detail img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }

  .video-news-detail {
    margin: 30px 0;
    width: 100%;
    height: 500px;
  }
  @media (max-width: 992px) {
    html,
    body {
      overflow-x: hidden;
    }
  }

  @media (max-width: 767px) {
    .news-columnist .VueCarousel-navigation-next {
      right: 20px !important;
    }
    .news-columnist .VueCarousel-navigation-prev {
      left: 20px !important;
    }
    .video-news-detail{
      height: 250px;
    }
  }
</style>
