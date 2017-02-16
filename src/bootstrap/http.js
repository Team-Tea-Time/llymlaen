import Vue from 'vue'

import NProgress from 'nprogress'

import store from '../store'

// Display a loading bar for HTTP requests
Vue.http.interceptors.push((request, next) => {
  NProgress.start()
  next((response) => {
    NProgress.done()
  })
})
