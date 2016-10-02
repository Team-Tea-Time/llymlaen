import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import Base from './Views/Base'
import Login from './Views/Login'

/* eslint-disable no-new */

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root = '/api'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Base,
      children: [
        { path: '/user/login', component: Login }
      ]
    }
  ]
})

new Vue({
  router
}).$mount('#app')
