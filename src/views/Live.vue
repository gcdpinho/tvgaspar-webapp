<template>
  <div id="live">
    <p class="text-loader" v-if="loader">Aguarde ...</p>
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar></Navbar>
    <section>
      <div class="container">
        <iframe width="100%" height="500px" :src="cams[id].src"></iframe>
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
    props: {
      id: 0
    },
    components: {
      Navbar,
      Footer,
      ClipLoader
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
  @media (max-width: 767px) {
    iframe {
      height: 200px;
    }
  }
</style>


