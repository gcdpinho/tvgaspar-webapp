import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/Home'
import NewsByCategory from './../views/NewsByCategory'
import NewsById from './../views/NewsById'
import Institutional from './../views/Institutional'
import Contact from './../views/Contact'
import Live from './../views/Live'
import TVIndoor from './../views/TVIndoor'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/NewsByCategory/:category/:page',
      name: 'NewsByCategory',
      component: NewsByCategory,
      props: true
    },
    {
      path: '/NewsById/:id',
      name: 'NewsById',
      component: NewsById,
      props: true
    },
    {
      path: '/Institutional',
      name: 'Institutional',
      component: Institutional
    },
    {
      path: '/Live/:id',
      name: 'Live',
      component: Live,
      props: true
    },
    {
      path: '/TVIndoor/',
      name: 'TVIndoor',
      component: TVIndoor
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/NewsByCategory/:category',
      redirect: '/NewsByCategory/:category/1'
    }
  ]
})