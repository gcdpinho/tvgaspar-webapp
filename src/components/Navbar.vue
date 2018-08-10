<template>
  <header>
    <div id="nav-desk">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <img class="logo" src="../assets/img/logo.png">
          </div>
          <div class="col-6" id="col-ad">
            <Ad type="topo" :index="0"></Ad>
          </div>
        </div>
      </div>
      <div id="navbar" :style="color == undefined || color == '' || color == null ? '--color: #9d3138': '--color:'+ color">
        <div class="container">
          <ul>
            <li :class="$route.name == 'Home' ? 'active' : ''">
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <a>Mega Menu</a>
            </li>
            <li :class="$route.name == 'NewsByCategory' ? 'active' : ''">
              <a class="bt-menu-dropdown" v-on:click="news.show = !news.show">Notícias
                <v-icon>fa fa-chevron-down</v-icon>
              </a>
              <div class="menu-dropdown" v-if="news.show">
                <ul>
                  <li class="item-menu" v-for="category of news.categories" :key="category.id">
                    <router-link :to="`/NewsByCategory/${category.category}`">{{category.category}}</router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a>Ao Vivo</a>
            </li>
            <li>
              <a>TV Indoor</a>
            </li>
            <li :class="$route.name == 'Institutional' ? 'active' : ''">
              <router-link to="/Institutional">Institucional</router-link>
            </li>
            <li :class="$route.name == 'Contact' ? 'active' : ''">
              <router-link to="/Contact">Contato</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="nav-mobile" :style="color == undefined || color == '' || color == null ? '--color: #9d3138': '--color:'+ color">
      <div class="row">
        <div class="col-6">
          <v-icon class="menu-hamburguer" v-on:click="flg_open = !flg_open">fa fa-bars</v-icon>
        </div>
        <div class="col-6">
          <img id="img-nav-mobile" src="../assets/img/logo-white.png">
        </div>
      </div>
      <div class="background-open-menu" v-if="flg_open" v-on:click="close_menu($event)">
        <div class="inner-menu-hamburguer">
          <div class="item-menu-mobile">
            <router-link to="/">Home</router-link>
          </div>
          <div class="item-menu-mobile">
            <a>Mega Menu</a>
          </div>
          <div class="item-menu-mobile">
            <a v-on:click="news_mobile_flg = !news_mobile_flg" :style="news_mobile_flg ? 'padding-bottom: 10px' : ''">Notícias
              <v-icon v-if="!news_mobile_flg">fa fa-chevron-down</v-icon>
              <v-icon v-if="news_mobile_flg">fa fa-chevron-up</v-icon>
            </a>
            <ul v-if="news_mobile_flg">
              <li class="inner-item-menu-mobile" v-for="category of news.categories" :key="category.id">
                <router-link :to="`/NewsByCategory/${category.category}`">{{category.category}}</router-link>
              </li>
            </ul>
          </div>
          <div class="item-menu-mobile">
            <a>Ao Vivo</a>
          </div>
          <div class="item-menu-mobile">
            <a>TV Indoor</a>
          </div>
          <div class="item-menu-mobile">
            <a>Institucional</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import Ad from "./Ad.vue";

  export default {
    name: "Navbar",
    props: {
      color: ""
    },
    components: {
      Ad
    },
    data() {
      return {
        news: {
          show: false,
          categories: [],
        },
        flg_open: false,
        news_mobile_flg: false
      }
    },
    mounted() {
      var self = this;
      window.addEventListener('click', function (e) {
        if (e.target.className != 'item-menu' && e.target.className != 'bt-menu-dropdown')
          self.news.show = false;
      })
      this.$http.get(`${this.$apiURL}/category`)
        .then(res => {
          this.news.categories = res.data;
        },
          err => {
            // eslint-disable-next-line
            console.log(err);
          }
        );
    },
    methods: {
      close_menu: function (event) {
        if (event.target.className == "background-open-menu")
          this.flg_open = false;
      }
    }
  };
</script>

<style scoped>
  .logo {
    width: 100%;
    max-width: 150px;
  }
  #col-ad {
    display: flex;
    align-items: center;
  }
  #navbar {
    width: 100%;
    background-color: var(--color);
    padding: 10px;
    margin-top: 15px;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    text-transform: uppercase;
    display: inline-block;
    cursor: pointer;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
  li:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  li:hover a {
    text-decoration: none;
  }
  li.active {
    background-color: rgba(0, 0, 0, 0.2);
  }
  li:first-child {
    border-left: none;
  }
  li a {
    padding: 10px 15px;
    display: block;
    color: white !important;
  }
  header {
    margin-bottom: 30px;
  }
  .menu-dropdown {
    position: absolute;
    background: var(--color);
    color: white;
    z-index: 99;
  }
  .menu-dropdown li {
    display: block;
    border-left: none;
  }
  .bt-menu-dropdown {
    display: flex;
    align-items: center;
  }
  .bt-menu-dropdown i {
    margin-left: 5px;
  }
  #nav-mobile {
    display: none;
    background-color: var(--color);
    height: 80px;
    padding: 15px 0;
    position: fixed;
    width: 100%;
    z-index: 5;
  }
  #nav-mobile .row {
    height: 100%;
  }
  #nav-mobile .col-6 {
    display: flex;
    align-items: center;
  }
  #img-nav-mobile {
    width: 65px;
    margin-left: auto;
  }
  .menu-hamburguer {
    color: white;
    font-size: 1.8rem;
  }
  .inner-menu-hamburguer {
    background-color: white;
    height: 100%;
    position: fixed;
    width: 50%;
    padding: 15px;
  }
  .background-open-menu {
    height: 100%;
    position: fixed;
    width: 100%;
    margin-top: 15px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .item-menu-mobile {
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--color);
  }
  .item-menu-mobile a {
    color: var(--color) !important;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    display: block;
  }
  .item-menu-mobile a:hover {
    text-decoration: none;
  }
  .item-menu-mobile a i {
    color: var(--color);
    margin-left: 5px;
  }
  .item-menu-mobile ul {
    padding: 10px 0;
    border-top: 1px solid var(--color);
  }
  @media (max-width: 992px) {
    #nav-desk {
      display: none;
    }
    #nav-mobile {
      display: block;
    }
    header {
      margin-bottom: 80px;
    }
  }
</style>