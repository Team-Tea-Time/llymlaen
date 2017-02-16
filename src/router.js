import Vue from 'vue'
import VueRouter from 'vue-router'

import { getAuthUser, userHasRole } from './auth'

import Root from './Views/Root'
import Admin from './Views/Admin'
import AdminOverview from './Views/Admin/Overview'
import AdminUsers from './Views/Admin/Users'
import AdminCharacters from './Views/Admin/Characters'
import AdminFreeCompanies from './Views/Admin/FreeCompanies'
import AdminListings from './Views/Admin/Listings'
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
        { path: 'user/login', component: UserLogin },
        {
          path: 'admin',
          component: Admin,
          redirect: 'admin/overview',
          beforeEnter: (to, from, next) => {
            getAuthUser().then(user => {
              next(userHasRole(user, 'Administrator'))
            })
          },
          children: [
            { path: 'overview', component: AdminOverview },
            { path: 'users', component: AdminUsers },
            { path: 'characters', component: AdminCharacters },
            { path: 'free-companies', component: AdminFreeCompanies },
            { path: 'listings', component: AdminListings }
          ]
        }
      ]
    }
  ]
})
