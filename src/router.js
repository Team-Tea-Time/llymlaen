import Vue from 'vue'
import VueRouter from 'vue-router'

import Root from './Views/Root'
import UserCharacters from './Views/User/Characters'
import UserConfirm from './Views/User/Confirm'
import UserLogin from './Views/User/Login'
import UserRegister from './Views/User/Register'

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        { path: 'user/characters', component: UserCharacters },
        { path: 'user/confirm/:code', component: UserConfirm },
        { path: 'user/register', component: UserRegister },
        { path: 'user/login', component: UserLogin }
      ]
    }
  ]
})
