import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/Home'
import NewsByCategory from './../views/NewsByCategory'
import NewsById from './../views/NewsById'

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
      path: '/NewsById/:id',
      name: 'NewsById',
      component: NewsById,
      props: true
    }
  ]
})