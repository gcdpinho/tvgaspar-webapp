<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <img class="logo" src="../assets/logo.png">
        </div>
        <div class="col-6" id="col-ad">
          <Ad type="topo" :index="0"></Ad>
        </div>
      </div>
    </div>
    <div id="navbar">
      <div class="container">
        <ul>
          <li :class="$route.name == 'home' ? 'active' : ''">
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <a>Mega Menu</a>
          </li>
          <li>
            <a class="bt-menu-dropdown" v-on:click="news.show = !news.show">Notícias
              <v-icon>fa fa-chevron-down</v-icon>
            </a>
            <div class="menu-dropdown" v-if="news.show">
              <ul>
                <li class="item-menu" v-for="category of news.categories" :key="category.id">
                  {{category.category}}
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
          <li>
            <a>Institucional</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
  import Ad from "./Ad.vue";

  export default {
    name: "Navbar",
    components: {
      Ad
    },
    data() {
      return {
        news: {
          show: false,
          categories: []
        }
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
    background-color: #9d3138;
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
    background: #9d3138;
    color: white;
    z-index: 99;
  }
  .menu-dropdown li {
    display: block;
    padding: 10px;
    border-left: none;
  }
  .bt-menu-dropdown {
    display: flex;
    align-items: center;
  }
  .bt-menu-dropdown i{
    margin-left: 5px;
  }
</style>