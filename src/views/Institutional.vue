<template>
  <div id="institutional">
    <p class="text-loader" v-if="loader">Aguarde ...</p>
    <clip-loader :loading="loader" color="white" size="80px">
    </clip-loader>
    <Navbar></Navbar>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="item">
              <div class="header">
                <p>Missão</p>
              </div>
              <div class="body">
                <p>Levar informação de qualidade e relevância ao nosso público, e proporcionar entretenimento e conhecimento através da internet.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="item">
              <div class="header">
                <p>Visão</p>
              </div>
              <div class="body">
                <p>Ser reconhecido como o melhor veículo de comunicação de Gaspar e região.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="item">
              <div class="header">
                <p>Valores</p>
              </div>
              <div class="body">
                <p>Imparcialidade nas informações, respeito aos valores familiares, foco nos resultados, integridade com todos os públicos, transparência, credibilidade das notícias e contribuir para o crescimento da comunidade.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row">
          <div class="header">
            <div class="header-title">
              TV Gaspar
            </div>
            > HISTÓRIA DA TV
          </div>
          <div class="body-text">
            <p class="text-left">Quem acessa o site da TV Gaspar, talvez não saiba o passado pioneiro de quem idealizou a primeira TV da cidade. Raul Neves, tem mais de 30 anos de experiência na área de audiovisual e televisão. Durante muitos anos foi apenas um sonho para Raul, que teve passagens pela RBS, FURB, e algumas produtoras da região. Em 1994 fundou a sua própria empresa produção de vídeo.<br>A TV Gaspar surgiu na internet em agosto de 2011. Desde o início a proposta sempre foi valorizar a população gasparense. Trazer à tona os anseios da comunidade. O objetivo principal é primar pela credibilidade da informação transmitida, aliada a qualidade da imagem e ética profissional.</p>
            <img src="../assets/img/historia1.jpg">
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
    name: "Institutional",
    components: {
      Navbar,
      Footer,
      ClipLoader
    },
    data() {
      return {
        loader: false
      }
    }
  }
</script>

<style scoped>
  #institutional {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .item {
    margin-bottom: 15px;
  }
  .item p {
    margin-bottom: 0;
  }
  .item .header {
    text-align: center;
    background: #9d3138;
    padding: 5px;
  }
  .item .header p {
    color: white;
    font-weight: 500;
  }

  .body {
    padding: 10px;
    background-color: rgba(245, 245, 247, 0.9);
    border: 1px solid #e3e2e2;
    text-align: center;
    height: 150px;
    display: flex;
    align-items: center;
  }

  .body-text {
    margin-top: 30px;
    text-align: center;
  }

  .body-text img {
    max-width: 600px;
    width: 100%;
    margin: 15px auto;
  }
  @media (max-width: 992px) {
    section {
      padding: 30px 0;
    }
  }
</style>

