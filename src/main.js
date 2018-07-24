import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCarousel from 'vue-carousel';
import firebase from 'firebase';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$apiURL = "http://localhost:3000"

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueCarousel);
Vue.use(ClipLoader);

firebase.initializeApp({
  apiKey: "AIzaSyAN8z_RHWKICWDl-QQ5cAQ8b1LvIWfrvOw",
  authDomain: "tvgaspar-backend.firebaseapp.com",
  databaseURL: "https://tvgaspar-backend.firebaseio.com",
  projectId: "tvgaspar-backend",
  storageBucket: "tvgaspar-backend.appspot.com",
  messagingSenderId: "702505431041"
});

new Vue({
  render: h => h(App)
}).$mount('#app')