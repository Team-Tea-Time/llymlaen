import defaults from './defaults'

export const clearAuth = (state) => {
  state.auth = defaults.auth()
}

export const setAuth = (state, user) => {
  state.auth.authenticated = true
  state.auth.user = user
}

export const setCurrentWorld = (state, world) => {
  state.currentWorld = world
}

export const setWorlds = (state, worlds) => {
  state.worlds = worlds
}
