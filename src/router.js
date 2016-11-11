import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './Views/Login'
import Register from './Views/Register'
import Root from './Views/Root'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        { path: '/user/register', component: Register },
        { path: '/user/login', component: Login }
      ]
    }
  ]
})
