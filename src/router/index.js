import VueRouter from 'vue-router'

import Guards from './guards'

import Admin from '../Views/Admin'
import AdminOverview from '../Views/Admin/Overview'
import AdminUsers from '../Views/Admin/Users'
import AdminCharacters from '../Views/Admin/Characters'
import AdminFreeCompanies from '../Views/Admin/FreeCompanies'
import AdminListings from '../Views/Admin/Listings'
import CharacterProfile from '../Views/Character/Profile'
import UserCharacters from '../Views/User/Characters'
import UserVerify from '../Views/User/Verify'
import UserLogin from '../Views/User/Login'
import UserPasswordReset from '../Views/User/PasswordReset'
import UserProfile from '../Views/User/Profile'
import UserRegister from '../Views/User/Register'
import UserSettings from '../Views/User/Settings'
import UserSocialAuth from '../Views/User/Social/Auth'
import UserSocialAuthReceive from '../Views/User/Social/AuthReceive'

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path:'/@:username',
      component: UserProfile
    },
    {
      path: '/user/characters',
      component: UserCharacters,
      beforeEnter: Guards.authenticated
    },
    {
      path: '/user/verify/:code',
      component: UserVerify,
      beforeEnter: Guards.guest
    },
    {
      path: '/user/register',
      component: UserRegister,
      beforeEnter: Guards.guest
    },
    {
      path: '/user/login',
      component: UserLogin,
      beforeEnter: Guards.guest
    },
    {
      path: '/user/settings',
      component: UserSettings,
      beforeEnter: Guards.authenticated
    },
    {
      path: '/user/social/:provider/auth',
      component: UserSocialAuth,
      beforeEnter: Guards.guest
    },
    {
      path: '/user/social/:provider/auth/receive',
      component: UserSocialAuthReceive,
      beforeEnter: Guards.guest
    },
    {
      path: '/user/password-reset/:token',
      component: UserPasswordReset
    },
    {
      path: '/characters/:id/:slug',
      component: CharacterProfile
    },
    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/overview',
      beforeEnter: Guards.admin,
      children: [
        { path: 'overview', component: AdminOverview },
        { path: 'users', component: AdminUsers },
        { path: 'characters', component: AdminCharacters },
        { path: 'free-companies', component: AdminFreeCompanies },
        { path: 'listings', component: AdminListings }
      ]
    }
  ]
})
