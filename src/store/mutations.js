import defaults from './defaults'

export const setAuth = (state, user) => {
  state.auth.authenticated = true
  state.auth.user = user
}

export const clearAuth = (state) => {
  state.auth = defaults.auth()
}
