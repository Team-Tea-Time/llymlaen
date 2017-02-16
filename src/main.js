import Vue from 'vue'

import './bootstrap/plugins'
import './bootstrap/components'
import './bootstrap/directives'
import './bootstrap/http'

import { getAuthUser } from './auth'
import router from './router'

getAuthUser()

new Vue({
  router
}).$mount('#app')
