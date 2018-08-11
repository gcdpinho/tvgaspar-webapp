<template>
  <div id="contact">
    <p class="text-loader" v-if="loader">Aguarde ...</p>
    <clip-loader :loading="loader" color="white" size="80px">
    </clip-loader>
    <Navbar></Navbar>
    <section>
      <div class="container">
        <div class="header">
          <div class="header-title">
            TV Gaspar
          </div>
          > CONTATO
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="body-text">
              <div class="item">
                <v-icon>fa fa-map-marker</v-icon>
                <span>Endereço:</span>
                Rua São José, 253 - Atitude Centro Empresarial 4º andar - Sala 407 - Centro - Gaspar
              </div>
              <div class="item">
                <v-icon>fa fa-phone</v-icon>
                <span>Telefone:</span> (47) 3318 0431
              </div>
              <div class="item">
                <v-icon>fa fa-whatsapp</v-icon>
                <span>Whatsapp:</span> (47) 9 9743 6800
              </div>
              <div class="item">
                <v-icon>fa fa-envelope</v-icon>
                <span>Contato:</span>
                <a href="mailto:jornalismo@tvgaspar.com.br"> jornalismo@tvgaspar.com.br</a>
              </div>
              <div class="item">
                <v-icon>fa fa-envelope</v-icon>
                <span>Comercial:</span>
                <a href="mailto:comercial@tvgaspar.com.br"> comercial@tvgaspar.com.br</a>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <gmap-map :center="position" :zoom="15" style="width:100%;  height: 300px;">
              <gmap-marker :position="position"></gmap-marker>
            </gmap-map>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="header">
          <div class="header-title">
            TV Gaspar
          </div>
          > ENVIE UM E-MAIL PARA NÓS
        </div>
        <form @submit="checkErrors('all')" method="post" action="javascript:void(0);">
          <div class="row">
            <div class="col-md-6">
              <div class="form-item">
                <label for="name">Nome</label>
                <input :class="name.error == null && name.value != '' ? 'success' : ''" type="text" name="name" id="name" v-model="name.value" v-on:input="checkErrors('name')">
                <p v-if="name.error != null" class="form-error">{{name.error}}
                  <v-icon>fa fa-exclamation-triangle</v-icon>
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-item">
                <label for="email">E-mail</label>
                <input :class="email.error == null && email.value != '' ? 'success' : ''" type="text" name="email" id="email" v-model="email.value" v-on:input="checkErrors('email')">
                <p v-if="email.error != null" class="form-error">{{email.error}}
                  <v-icon>fa fa-exclamation-triangle</v-icon>
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-item">
                <label for="message">Mensagem</label>
                <textarea :class="message.error == null && message.value != '' ? 'success' : ''" name="message" id="message" v-model="message.value" rows="5" v-on:input="checkErrors('message')"></textarea>
                <p v-if="message.error != null" class="form-error">{{message.error}}
                  <v-icon>fa fa-exclamation-triangle</v-icon>
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <button type="submit">ENVIAR</button>
            </div>
            <div class="col-md-8">
              <p v-if="flg_sucess" class="email-success">Mensagem enviada com sucesso, obrigado!</p>
              <p v-if="flg_error" class="email-error">Não foi possível enviar sua mensagem, tente novamente!</p>
            </div>
          </div>
        </form>
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
    name: "Contact",
    components: {
      Navbar,
      Footer,
      ClipLoader
    },
    data() {
      return {
        loader: false,
        name: {
          value: "",
          error: null
        },
        email: {
          value: "",
          error: null
        },
        message: {
          value: "",
          error: null
        },
        email_to: "gcdpinho@gmail.com",
        flg_sucess: false,
        flg_error: false,
        position: {
          lat: -26.9290608,
          lng: -48.9533052
        }
      }
    },
    methods: {
      checkErrors: function (type) {
        switch (type) {
          case 'all':
            if (this.name.value == "")
              this.name.error = "Digite seu nome";
            else
              this.name.error = null;
            if (this.email.value == "")
              this.email.error = "Digite seu email";
            else
              this.email.error = null;
            if (this.message.value == "")
              this.message.error = "Digite sua mensagem";
            else
              this.message.error = null;
            if (this.name.error == null && this.email.error == null && this.message.error == null)
              this.send_email();
            break;
          case 'name':
            if (this.name.value == "")
              this.name.error = "Digite seu nome";
            else
              this.name.error = null;
            break;
          case 'email':
            if (this.email.value == "")
              this.email.error = "Digite seu nome";
            else
              this.email.error = null;
            break;
          case 'message':
            if (this.message.value == "")
              this.message.error = "Digite seu nome";
            else
              this.message.error = null;
            break;
        }
      },
      send_email: function () {
        this.loader = true;
        this.$http.post(`${this.$apiURL}/email`, {
          from: this.email.value,
          to: this.email_to,
          subject: `${this.name.value} entrou em contato pelo site!`,
          text: `Contato:\n Nome: ${this.name.value}\n E-mail: ${this.email.value}\nMensagem:\n ${this.message.value}`
        }).then(() => {
          this.flg_sucess = true;
          this.loader = false;
          this.name.value = "";
          this.email.value = "";
          this.message.value = "";
          setTimeout(() => {
            this.flg_sucess = false;
          }, 5000);
        },
          err => {
            // eslint-disable-next-line
            console.log(err);
            this.flg_error = true;
            setTimeout(() => {
              this.flg_error = false;
            }, 5000);
          }
        );
      }
    }
  }
</script>

<style scoped>
  #contact {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .body-text {
    margin-top: 30px;
  }

  .item {
    margin-bottom: 5px;
  }
  .item i {
    color: #9d3138;
    margin-right: 5px;
    font-size: 16px;
  }

  .item span {
    color: #9d3138;
    font-weight: 500;
  }
  a {
    color: inherit;
  }
  a:hover {
    color: inherit;
  }

  form {
    margin: 50px 0;
  }

  .form-item {
    margin-bottom: 20px;
  }

  form input,
  form textarea {
    width: 100%;
    border: none;
    border-bottom: 1px solid #49494d;
  }

  form input:focus,
  form textarea:focus {
    border-bottom: 1px solid #9d3138 !important;
  }

  form input.success,
  form textarea.success {
    border-bottom: 2px solid #9d3138 !important;
  }

  form label {
    color: #9d3138;
    font-weight: 500;
  }

  form button {
    background-color: #9d3138;
    color: white;
    border: none;
    padding: 7px 20px;
    cursor: pointer;
    box-shadow: 1px 1px 5px 0px #888888;
    margin-bottom: 20px;
  }
  .email-success {
    color: #078a07;
    font-weight: bold;
  }
  .email-error {
    color: #9d3138;
    font-weight: bold;
  }
  section {
    padding: 30px 0;
  }

  @media (max-width: 767px) {
    .vue-map-container {
      margin-top: 20px;
    }
  }
</style>


