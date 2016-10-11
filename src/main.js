import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'

import NProgress from 'nprogress'

import Login from './Views/Login'
import Root from './Views/Root'

/* eslint-disable no-new */

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueCookie)

Vue.http.options.root = '/api'

Vue.http.interceptors.push((request, next) => {
  NProgress.start()
  next((response) => {
    NProgress.done()
  })
})

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        { path: '/user/login', component: Login }
      ]
    }
  ]
})

new Vue({
  router
}).$mount('#app')
