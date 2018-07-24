<template>
    <div class="app-slider">
        <Carousel v-if="data_slider.length && type =='news'" :perPage="1" :navigationEnabled="true" paginationActiveColor="#d4000e">
            <Slide v-for="news of data_slider" :key="news.id">
                <div class="news-slider" :style="`background: url('${news.images[0].src}') center no-repeat`">
                    <div class="container">
                        <h2>{{news.headline}}</h2>
                        <p>{{news.subtitle}}</p>
                    </div>
                </div>
            </Slide>
        </Carousel>
        <Carousel v-if="data_slider.length && type =='images'" :perPage="4" :paginationEnabled="false" :autoplay="true" :autoplayTimeout="5000" :loop="true">
            <Slide v-for="image of data_slider" :key="image.id">
                <img class="images-slider" :src="image.src">
            </Slide>
        </Carousel>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import firebase from 'firebase';

    export default {
        name: "Slider",
        props: {
            type: ""
        },
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                data_slider: []
            }
        },
        mounted() {
            switch (this.type) {
                case "news":
                    this.$http.post(`${this.$apiURL}/news/byTag`, {
                        tag: "slider"
                    }).then(res => {
                        this.data_slider = res.data;
                        this.data_slider.map(news =>
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
                    break;
                case "images":
                    this.$http.post(`${this.$apiURL}/image/byTag`, {
                        tag: "slider"
                    }).then(res => {
                        this.data_slider = res.data;
                        this.data_slider.map(image =>
                            firebase.storage().ref().child(`imagens/${image.src}`).getDownloadURL()
                                .then(img => image.src = img)
                        );
                    }, err => {
                        // eslint-disable-next-line
                        console.log(err);
                    });
                    break;
            }
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
    .images-slider{
        width: 95%;
    }
</style>
