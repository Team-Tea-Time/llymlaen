import Vue from 'vue'
import { Message } from 'element-ui'
import store from 'store'

// getAuthUser returns a promise which is fulfilled with the authenticated user
// and updates authentication state if successful
export const getAuthUser = function () {
  return new Promise((resolve, reject) => {
    Vue.http.get('/api/user/me').then(response => {
      store.commit('setAuth', response.body)
      resolve(response.body)
    }, response => {
      reject(new Error('User not authenticated or token expired.'))
    })
  })
}

// attemptAuth attempts to establish authentication state and displays
// appropriate feedback messages
export const attemptAuth = function (
  loginSucceededMessage = `Hello, ${user.name}!`,
  loginFailedMessage = "Login failed. Please make sure your account email address is verified, or get in touch if there's a problem.",
  messageDuration = 8000
) {
  Vue.http.get('/api/user/me').then(() => {
    store.commit('setAuth', response.body)
    Message.success({
      message: loginSucceededMessage,
      duration: messageDuration
    })
  }, () => {
    Message.error({
      message: loginFailedMessage,
      duration: messageDuration
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
