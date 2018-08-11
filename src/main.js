import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCarousel from 'vue-carousel'
import firebase from 'firebase'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import router from './routes'
import Vuetify from 'vuetify'
import VueMq from 'vue-mq'
import moment from "moment"
import VueMomentJS from "vue-momentjs"
import * as VueGoogleMaps from "vue2-google-maps";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.prototype.$apiURL = "http://localhost:3000"
// Vue.prototype.$apiURL = "https://tvgaspar-api.herokuapp.com"

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueCarousel);
Vue.use(ClipLoader);
Vue.use(Vuetify, {
  iconfont: 'fa4'
});

Vue.use(VueMomentJS, moment);

Vue.use(VueMq, {
  breakpoints: {
    md: 767,
    desktop: Infinity
  }
});

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAdAvOoqBvrU_bh7RlEMxMn_VTfkXbQKM4"
  }
});

firebase.initializeApp({
  apiKey: "AIzaSyAN8z_RHWKICWDl-QQ5cAQ8b1LvIWfrvOw",
  authDomain: "tvgaspar-backend.firebaseapp.com",
  databaseURL: "https://tvgaspar-backend.firebaseio.com",
  projectId: "tvgaspar-backend",
  storageBucket: "tvgaspar-backend.appspot.com",
  messagingSenderId: "702505431041"
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')