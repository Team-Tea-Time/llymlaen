import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    id: 0,
    name: null,
    token: null
  }
}

const mutations = {
}

export default new Vuex.Store({
  state,
  mutations
})
