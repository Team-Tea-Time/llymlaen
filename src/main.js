import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'

import NProgress from 'nprogress'

import './theme/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import {
  Button,
  Card,
  Col,
  Form,
  FormItem,
  Input,
  Row
} from 'element-ui'

import Content from './Components/Layout/Content'
import PageHeader from './Components/Layout/PageHeader'
import TopBar from './Components/Layout/TopBar'

import { Validation } from './Plugins/Validation'

import router from './router'

/* eslint-disable no-new */

/* Plugins */

Vue.use(VueCookie)
Vue.use(VueResource)
Vue.use(Validation)

/* Global components */

Vue.component(Content.name, Content)
Vue.component(PageHeader.name, PageHeader)
Vue.component(TopBar.name, TopBar)

// ElementUI
locale.use(lang)
Vue.use(Button)
Vue.use(Card)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)

Vue.http.interceptors.push((request, next) => {
  NProgress.start()
  next((response) => {
    NProgress.done()
  })
})

new Vue({
  router
}).$mount('#app')
