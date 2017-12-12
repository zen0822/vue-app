/**
 * the main file that the client of app
 */

import './common'

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './route/route'
import App from './App/App'

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

const app = new Vue({
  ...App,
  router
}).$mount('#app')
