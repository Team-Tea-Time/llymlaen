import Vue from 'vue'

import './bootstrap/plugins'
import './bootstrap/components'
import './bootstrap/directives'
import './bootstrap/http'

import router from './router'

new Vue({
  router
}).$mount('#app')
