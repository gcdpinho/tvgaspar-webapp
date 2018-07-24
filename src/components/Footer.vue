<template>
  <div id="footer">
    <div class="inner-footer">
      <div class="row">
        <div class="col-6" id="col-logo">
          <img class="logo" src="../assets/logo-white.png">
        </div>
        <div class="col-6">
          <h3>Tags</h3>
          <div class="tag-content">
            <div class="tag" v-for="tag of tags" :key="tag.id">
              {{tag.tag}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="below-footer">
      <div class="container">
        <p>© 2018, Copyrights TV Gaspar. Todos os direitos reservados. Desenvolvido por
          <a href="https://vulpis.tech/" target="_blank">Vulpis</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        tags: null
      };
    },
    mounted() {
      this.$http.get(`${this.$apiURL}/tag`).then(
        res => {
          this.tags = res.data;
        },
        err => {
          // eslint-disable-next-line
          console.log(err);
        }
      );
    }
  };
</script>

<style scoped>
  img {
    max-width: 150px;
    width: 100%;
    margin-left: auto;
  }
  #footer {
    margin-top: auto;
  }
  .inner-footer {
    background-color: #0e0e0e;
    padding: 50px 30px;
  }
  h3 {
    font-size: 1.5rem;
    color: white;
    margin: 0;
    position: relative;
  }
  h3:before {
    bottom: 0px;
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    width: 50px;
    background-color: #d4000e;
    left: 2px;
  }
  h3::after {
    background: rgba(255, 255, 255, 0.8);
    content: "";
    display: block;
    height: 2px;
    margin: 5px 2px;
    width: 80px;
  }
  .tag {
    cursor: pointer;
    color: white;
    background-color: #70717c;
    padding: 6px 12px;
    margin: 7px 7px 7px 0;
    border-radius: 2px;
    display: inline-block;
  }
  .tag:hover {
    background-color: #f2f2f6;
    color: #70717c;
  }
  .tag-content {
    max-width: 60%;
  }
  #col-logo {
    display: flex;
    align-items: center;
  }
  #below-footer {
    width: 100%;
    background-color: #09090b;
    padding: 7px;
  }
  #below-footer p {
    margin: 0;
    color: white;
  }
  #below-footer a {
    cursor: pointer;
    color: white;
  }
  #below-footer a:hover {
    text-decoration: underline;
  }
</style>
