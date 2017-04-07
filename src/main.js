import Vue from 'vue'

import './bootstrap/plugins'
import './bootstrap/components'
import './bootstrap/directives'
import './bootstrap/http'

import { getAuthUser } from './auth'
import router from './router'
import store from './store'

import Root from 'Views/Root'

getAuthUser(false)

// Set up world context
Vue.http.get('worlds').then(response => {
  store.commit('setWorlds', response.body)

  let domain = window.location.hostname
  let matches = domain.match(/(?:\/\/)?([A-Za-z]*)\..+\..+/)

  if (matches) {
    let world = response.body.find(world => {
      return world.name_lowercase === matches[1]
    })
    store.commit('setCurrentWorld', world)
  } else {
    store.commit('setCurrentWorld', null)
  }
})

const RootConstructor = Vue.extend(Root)
new RootConstructor({
  el: '#app',
  router
})
