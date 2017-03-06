import Vue from 'vue'

import store from 'store'

export const getAuthUser = function () {
  return new Promise((resolve, reject) => {
    Vue.http.get('/api/user').then(response => {
      store.commit('setAuth', response.body)
      resolve(response.body)
    }, response => {
      reject(new Error('User not authenticated or token expired.'))
    })
  })
}

export const userHasRole = function (user, roleName) {
  if (!user.roles) {
    return false
  }

  return !!user.roles.find(role => {
    return role.name === roleName
  })
}
