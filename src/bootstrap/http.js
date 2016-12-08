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

// Get the initial user state, if applicable
Vue.http.get('/api/user').then((response) => {
  store.commit('setAuth', response.body)
}, (response) => {
  console.log('User not authenticated or token expired.')
})
