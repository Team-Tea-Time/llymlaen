import Vue from 'vue'
import store from 'store'
import * as Cookies from 'js-cookie'

// setAuth persists the given access token and refresh token to cookies.
export const setAuth = function (accessToken, refreshToken, expires) {
  let options = {
    expires,
    domain: process.env.NODE_ENV === 'production'
      ? 'xiv.world' : 'xiv-local.world'
  }

  Cookies.set('access_token', accessToken, options)

  if (refreshToken) {
    Cookies.set('refresh_token', refreshToken, options)
  }
}

// getAuthUser returns a promise which is fulfilled with the authenticated user
// and updates authentication state if successful.
export const getAuthUser = function () {
  return new Promise((resolve, reject) => {
    Vue.http.get('users/me').then(response => {
      store.commit('setAuth', response.body)
      resolve(response.body)
    }, response => {
      store.commit('clearAuth')
      reject(new Error('User not authenticated or token expired'))
    })
  })
}

// userHasRole checks the given user's role assignments for the given role
export const userHasRole = function (user, roleName) {
  if (!user.roles) {
    return false
  }

  return !!user.roles.find(role => {
    return role.name === roleName
  })
}
