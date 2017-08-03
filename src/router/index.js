import VueRouter from 'vue-router'

import Guards from './guards'

import Admin from '../Views/Admin'
import AdminOverview from '../Views/Admin/Overview'
import AdminUsers from '../Views/Admin/Users'
import AdminArticles from '../Views/Admin/Articles'
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
      path: '/@:username',
      component: UserProfile,
      meta: { title: 'User profile' }
    },
    {
      path: '/user/characters',
      component: UserCharacters,
      beforeEnter: Guards.authenticated,
      meta: { title: 'Your characters' }
    },
    {
      path: '/user/verify/:code',
      component: UserVerify,
      beforeEnter: Guards.guest,
      meta: { title: 'User verification' }
    },
    {
      path: '/user/register',
      component: UserRegister,
      beforeEnter: Guards.guest,
      meta: { title: 'Register' }
    },
    {
      path: '/user/login',
      component: UserLogin,
      beforeEnter: Guards.guest,
      meta: { title: 'Log in' }
    },
    {
      path: '/user/settings',
      component: UserSettings,
      beforeEnter: Guards.authenticated,
      meta: { title: 'Your account' }
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
      component: UserPasswordReset,
      meta: { title: 'Password reset' }
    },
    {
      path: '/characters/:id/:slug',
      component: CharacterProfile,
      meta: { title: 'Character profile' }
    },
    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/overview',
      beforeEnter: Guards.admin,
      children: [
        { path: 'overview', component: AdminOverview, meta: { title: 'Admin: Overview' } },
        { path: 'users', component: AdminUsers, meta: { title: 'Admin: Users' } },
        { path: 'articles', component: AdminArticles, meta: { title: 'Admin: Articles' } },
        { path: 'characters', component: AdminCharacters, meta: { title: 'Admin: Characters' } },
        { path: 'free-companies', component: AdminFreeCompanies, meta: { title: 'Admin: Free Companies' } },
        { path: 'listings', component: AdminListings, meta: { title: 'Admin: Listings' } }
      ]
    }
  ]
})
