<template>
    <Carousel v-if="allNews.length" :perPage="1" :navigationEnabled="true" paginationActiveColor="#d4000e">
        <Slide v-for="news of allNews" :key="news.id">
            <div class="news-slider" :style="`background: url('${news.images[0].src}') center no-repeat`">
                <div class="container">
                    <h2>{{news.headline}}</h2>
                    <p>{{news.subtitle}}</p>
                </div>
            </div>
        </Slide>
    </Carousel>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import firebase from 'firebase';

    export default {
        name: "Slider",
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                allNews: []
            }
        },
        mounted() {
            this.$http.post(`${this.$apiURL}/news/byTag`, {
                tag: "slider"
            }).then(res => {
                this.allNews = res.data;
                console.log(this.allNews);
                this.allNews.map(news =>
                    news.images.map(image =>
                        firebase.storage().ref().child('imagens/' + image.src).getDownloadURL()
                            .then(img => {
                                image.src = img;
                            })
                    )
                );
            }, err => {
                console.log(err);
            });
        }
    };
</script>

<style scoped>
    section {
      padding: 0;
    }
    .news-slider {
      height: 500px;
      width: 100%;
      background-size: cover !important;
      color: white;
      display: flex;
      align-items: center;
    }
    .news-slider::after {
      background: #000;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      display: block;
      position: absolute;
      opacity: 0.5;
    }
    .news-slider .container {
      position: relative;
      z-index: 10;
    }
    .news-slider h2 {
      text-align: center;
      font-size: 3rem;
      text-transform: uppercase;
      font-weight: 800;
    }
    .news-slider p {
      text-align: center;
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: 500;
    }
</style>
