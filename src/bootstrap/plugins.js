import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import { LoadingState } from '../Plugins/LoadingState'
import { Validation } from '../Plugins/Validation'

Vue.use(LoadingState)
Vue.use(Validation)
Vue.use(VueCookie)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)