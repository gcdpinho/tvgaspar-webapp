<template>
    <div id="tv-indoor">
        <p class="text-loader" v-if="loader">Aguarde ...</p>
        <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
        <Navbar></Navbar>
        <section>
            <div class="container">
                <div class="row">
                    <p>Através de um sistema inovador, a TV Gaspar agora leva sua programação para vários monitores espalhados pela cidade, em locais de grande fluxo de pessoas, dando mais visibilidade ao conteúdo e aos anunciantes.<br><br> São parceiros do TV Gaspar Indoor:</p>
                </div>
                <div class="row">
                    <div :class="`col-md-${12/img_row}`" v-for="img of tv_indoor" :key="img.id">
                        <div class="item-img">
                            <img :src="`tvindoor/${img.src}`">
                            <p class="title">{{img.name}}</p>
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
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

    export default {
        name: "Live",
        components: {
            Navbar,
            Footer,
            ClipLoader
        },
        data() {
            return {
                loader: false,
                img_row: 3,
                tv_indoor: [
                    { id: 0, name: 'Like Acqua Academia', number: '32', src: '0.jpg' },
                    { id: 1, name: 'Like Fitness (centro)', number: '32', src: '1.jpg' },
                    { id: 2, name: 'Mercado Reinert', number: '32', src: '2.jpg' },
                    { id: 3, name: 'H. Bertoldi', number: '32', src: '3.jpg' },
                    { id: 4, name: 'Pão de Mel', number: '32', src: '4.jpg' },
                    { id: 5, name: 'Padaria Qui Delícia', number: '32', src: '5.jpg' },
                    { id: 6, name: 'Lanches Beira Rio', number: '32', src: '6.jpg' },
                    { id: 7, name: 'Supermercado Goedert', number: '52', src: '7.jpg' },
                    { id: 8, name: 'Xodó Som', number: '42', src: '8.jpg' },
                    { id: 9, name: 'Clínica Dentária União', number: '32', src: '9.jpg' },
                    { id: 10, name: 'Auto Posto Julinho (Av das Comunidades)', number: '32', src: '10.jpg' },
                    { id: 11, name: 'Restaurante Deck Gourmet', number: '43', src: '11.jpg' },
                    { id: 12, name: 'Restaurante Questão de Gosto', number: '40', src: '12.jpg' },
                    // { id: 13, name: 'Panificadora e Confeitaria, Coração do Vale', number: '32', src: '' },
                    // { id: 14, name: ' Laboratório Reference', number: '26', src: '' },
                ]
            }
        }
    }
</script>

<style scoped>
    #tv-indoor {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    img {
      width: 100%;
      height: 195px;
    }
    .title {
      text-align: center;
      font-weight: 500;
      margin-top: 10px;
    }
    .item-img {
      cursor: pointer;
    }
    .item-img:hover img {
      opacity: 0.9;
    }
    .item-img:hover p {
      color: #9d3138;
    }
</style>


