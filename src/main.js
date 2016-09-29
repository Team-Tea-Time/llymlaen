import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App'

import Login from './Views/Login'

/* eslint-disable no-new */

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root = '/api'

var router = new VueRouter({
  hashbang: false,
  history: true
})

router.map({
  '/user/login': {
    component: Login
  }
})

router.start(App, '#app')
