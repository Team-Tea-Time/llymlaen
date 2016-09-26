import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'

import Login from './Views/Login'

/* eslint-disable no-new */

Vue.use(VueRouter)

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
