import Vue from 'vue'
import NProgress from 'nprogress'
import * as Cookies from 'js-cookie'

import store from '../store'

// Configure vue-resource
Vue.http.options.credentials = false
Vue.http.options.emulateJSON = true
Vue.http.options.root = (process.env.NODE_ENV === 'production')
                      ? 'http://api.xiv.world'
                      : 'http://api.xiv-local.world:9000'

// Display a loading bar for HTTP requests, and set an authorisation header if
// an access token is available
Vue.http.interceptors.push((request, next) => {
  let accessToken = Cookies.get('access_token')

  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  NProgress.start()
  next(response => {
    NProgress.done()
  })
})
