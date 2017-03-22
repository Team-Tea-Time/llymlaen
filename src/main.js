import Vue from 'vue'

import './bootstrap/plugins'
import './bootstrap/components'
import './bootstrap/directives'
import './bootstrap/http'

import { getAuthUser } from './auth'
import router from './router'

import Root from 'Views/Root'

getAuthUser(false)

const RootConstructor = Vue.extend(Root)
new RootConstructor({
  el: '#app',
  router
})
