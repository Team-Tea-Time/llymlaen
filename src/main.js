import Vue from 'vue'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'

import NProgress from 'nprogress'

import router from './router'

/* eslint-disable no-new */

Vue.use(VueResource)
Vue.use(VueCookie)

Vue.http.interceptors.push((request, next) => {
  NProgress.start()
  next((response) => {
    NProgress.done()
  })
})

new Vue({
  router
}).$mount('#app')
