<template>
  <div id="live">
    <p class="text-loader" v-if="loader">Aguarde ...</p>
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar></Navbar>
    <section>
      <div class="container">
        <div class="row">
          <div :class="`col-${$mq === 'md' ? 12 : 9}`">
            <!-- <iframe width="100%" height="400px" :src="cams[id].src"></iframe> -->
            <img :src="require('../assets/img/manutencao.jpg')">
          </div>
            <div class="col-3" v-if="$mq != 'md'">
              <Ad type="vertical"></Ad>
              <Highlights></Highlights>
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
  import Highlights from "./../components/Highlights.vue";
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import Ad from "./../components/Ad.vue";

  export default {
    name: "Live",
    props: {
      id: 0
    },
    components: {
      Navbar,
      Footer,
      ClipLoader,
      Ad,
      Highlights
    },
    data() {
      return {
        loader: false,
        cams: [
          { id: 0, name: 'Avenida das Comunidades nr 310', src: 'https://camerite.com/embed/4514/santa-catarina/gaspar/avenida-das-comunidades-310?autoplay=true&amp;sound=true' },
          { id: 1, name: 'Nereu Ramos nr 110', src: 'https://camerite.com/embed/3176/parana/pontal-do-parana/rua-dr-nereu-ramos-n-110?autoplay=true&amp;sound=true' },
          { id: 2, name: 'Rua São José', src: 'https://camerite.com/embed/45092/undefined/undefined/rua-sao-jose-253?autoplay=true&amp;sound=true' },
          { id: 3, name: 'Praça Getúlio Vargas', src: 'https://camerite.com/embed/3172/santa-catarina/gaspar/praca-getulio-vargas?autoplay=true&amp;sound=true' },
          { id: 4, name: 'Ponte Hercílio Decke', src: 'https://camerite.com/embed/45502/undefined/undefined/ponte-hercilio-deeke?autoplay=true&amp;sound=true' },
          { id: 5, name: 'Viaduto Avenida', src: 'https://camerite.com/embed/3193/santa-catarina/gaspar/avenida-das-comunidades-20?autoplay=true&sound=true' },
        ]
      }
    }
  }
</script>

<style scoped>
  #live {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  img {
    width: 100%;
  }
  @media (max-width: 767px) {
    iframe {
      height: 200px;
    }
  }
</style>


