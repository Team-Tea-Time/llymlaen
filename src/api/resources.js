import Vue from 'vue'

export var user = Vue.resource('/api/user', {}, {
  getCharacters: { method: 'GET', url: '/api/user/characters' }
})

export var character = Vue.resource(null, {}, {
  index: { method: 'GET', url: '/api/character' },
  search: { method: 'POST', url: '/api/character/search' },
  add: { method: 'POST', url: '/api/character' },
  verify: { method: 'POST', url: '/api/character{/id}/verify' },
  setMain: { method: 'POST', url: '/api/character{/id}/set-main' },
  remove: { method: 'DELETE', url: '/api/character{/id}' }
})
