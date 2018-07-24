<template>
    <Carousel>
        <Slide>
            <span>Slide 1 Content</span>
        </Slide>
        <Slide>
            <span>Slide 2 Content</span>
        </Slide>
    </Carousel>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    export default {
        name: "Slider",
        components: {
            Carousel,
            Slide
        },
        date() {
            return {
                news: null
            }
        },
        mounted() {
            this.$http.post(`${this.$apiURL}/news/byTag`, {
                tag: "slider"
            }).then(res => {
                this.news = res.data;
                console.log(this.news);
            }, err => {
                console.log(err);
            });
        }
    };
</script>

<style scoped>
</style>
