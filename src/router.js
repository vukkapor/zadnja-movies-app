import Vue from 'vue'
import Router from 'vue-router'
import AppMovies from './components/AppMovies'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/movies',
    component: AppMovies
  }]
})