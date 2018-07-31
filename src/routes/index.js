import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/Home'
import NewsByCategory from './../views/NewsByCategory'
import NewsDetail from './../views/NewsDetail'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/NewsByCategory/:category',
      name: 'NewsByCategory',
      component: NewsByCategory,
      props: true
    },
    {
      path: '/NewsDetail',
      name: 'NewsDetail',
      component: NewsDetail,
      props: true
    }
  ]
})