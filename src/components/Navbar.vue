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
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Mega Menu</a>
          </li>
          <li>
            <a>Notícias</a>
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
    background-color: #d4000e;
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
    color: white;
    cursor: pointer;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
  li:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  li:first-child {
    border-left: none;
  }
  li a {
    padding: 10px 15px;
    display: block;
  }
  header{
    margin-bottom: 30px;
  }
</style>