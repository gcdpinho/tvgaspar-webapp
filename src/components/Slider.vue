<template>
    <div class="app-slider">
        <Carousel v-if="data_slider.length && type =='news'" :perPage="1" :navigationEnabled="true" paginationActiveColor="#9d3138">
            <Slide v-for="news of data_slider" :key="news.id">
                <div class="news-slider" v-if="news.images.length > 0" :style="`background: url('${news.images[0].src}') center no-repeat`" v-on:mouseup="up($event, news, news.categories[0].category)" v-on:mousedown="down($event)">
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
        <Carousel v-if="data_slider.length && type =='news-columnist'" :class="type" :perPage="4" :paginationEnabled="false" :autoplay="true" :autoplayTimeout="5000" :loop="true" :navigationEnabled="true">
            <Slide v-for="news of data_slider" :key="news.id">
                <div class="each-news" v-bind:style="news.categories.length > 0 ? '--color:'+news.categories[0].color : ''" v-on:mouseup="up($event, news, news.categories[0].category)" v-on:mousedown="down($event)">
                    <div class="img-news text-center">
                        <img v-if="news.images.length > 0" :src="news.images[0].src">
                        <span v-if="news.categories.length > 0" class="category">{{news.categories[0].category}}</span>
                    </div>
                    <div class="inner">
                        <h3>{{news.headline}}</h3>
                        <p>{{news.abstract}}</p>
                    </div>
                    <div class="footer-news"></div>
                </div>
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
            type: "",
            category: ""
        },
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                data_slider: [],
                start_point: {
                    x: null,
                    y: null
                }
            }
        },
        mounted() {
            switch (this.type) {
                case "news":
                    if (this.category == undefined)
                        this.$http.post(`${this.$apiURL}/news/byTagNotCategory`, {
                            tag: "slider",
                            category: "Colunista"
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
                    else
                        this.$http.post(`${this.$apiURL}/news/byTagByCategory`, {
                            tag: "slider",
                            category: this.category
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
                case "news-columnist":
                    this.$http.post(`${this.$apiURL}/news/byTagByCategory`, {
                        tag: "slider",
                        category: 'Colunista'
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
            }
        },
        methods: {
            showNews: function (news, category) {
                this.$router.push({ name: "NewsDetail", params: { category: category, news: news } })
            },
            down: function (event) {
                this.start_point.x = event.screenX;
                this.start_point.y = event.screenY;
            },
            up: function (event, news, category) {
                let end_point = {
                    x: event.screenX,
                    y: event.screenY
                };
                if (Math.abs(end_point.x - this.start_point.x) < 5)
                    this.showNews(news, category);
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
    .images-slider {
      width: 95%;
    }
    .news-slider,
    .images-slider,
    .each-news {
      cursor: pointer;
    }
</style>
