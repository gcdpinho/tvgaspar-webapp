<template>
  <div id="tv-indoor">
    <p class="text-loader" v-if="loader">Aguarde ...</p>
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar></Navbar>
    <section>
      <div class="container">
        <div class="header">
          <div class="header-title">
            TV Gaspar
          </div>
          > TV indoor
        </div>
        <div class="row row-text">
          <p class="text-justify">A TV Gaspar conta com 20 TVs instaladas em diversos segmentos comerciais na cidade, onde leva informação e conteúdo, de uma forma rápida e direta. Uma alternativa muito eficiente e moderna para quem deseja anunciar em Gaspar.</p>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="row row-tv">
              <div :class="`col-md-${12/tv_row} col-tv`" v-for="tv of tv_indoor" :key="tv.id">
                <div class="img-tv">
                  <v-icon>fa fa-tv</v-icon>
                  <p :class="tv.id+1 > 9 ? 'two':''">{{tv.id+1}}</p>
                </div>
                <p class="title">{{tv.name}}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <img src="../assets/img/cartaz_tv_indoor.jpg">
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
        tv_row: 2,
        tv_indoor: [
          { id: 0, name: 'Academia Like Acqua' },
          { id: 1, name: 'Academia Like Fitness' },
          { id: 2, name: 'Auto Posto Julinho' },
          { id: 3, name: 'Auto Posto Testoni' },
          { id: 4, name: 'Churrascaria Toni' },
          { id: 5, name: 'Clínica Dentária União' },
          { id: 6, name: 'Dietrch Mat. De Constr.' },
          { id: 7, name: 'Laboratório Reference' },
          { id: 8, name: 'Mercado Reinert' },
          { id: 9, name: 'Moendão Cachaçaria' },
          { id: 10, name: 'Motec Moto Peças' },
          { id: 11, name: 'Padaria Coração do Vale' },
          { id: 12, name: 'Padaria Pão De Mel' },
          { id: 13, name: 'Padaria Qui Delicia' },
          { id: 14, name: 'Restaurante Beira Rio' },
          { id: 15, name: 'Restaurante Estação' },
          { id: 16, name: 'Restaurante H. Bertoldi' },
          { id: 17, name: 'Restaurante Questão de Gosto' },
          { id: 18, name: 'Restaurante Raul\'s' },
          { id: 19, name: 'Xodó Som' },
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
  }
  .title {
    display: inline-block;
    font-weight: 500;
    margin-bottom: 0;
    margin-left: 10px;
  }
  .col-tv {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .row-tv,
  .row-text {
    margin-bottom: 15px;
  }
  .img-tv {
    display: inline-block;
    position: relative;
  }
  .img-tv i {
    font-size: 40px;
  }
  .img-tv p {
    margin-bottom: 0;
    position: absolute;
    font-weight: 500;
    top: calc(50% - 14px);
    left: calc(50% - 5px);
  }

  .img-tv p.two {
    left: calc(50% - 9px);
  }

  .header {
    margin-bottom: 20px;
  }
</style>


