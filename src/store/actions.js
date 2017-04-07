export const clearAuth = ({ commit }) => commit('clearAuth')
export const setAuth = ({ commit }, user) => commit('setAuth', user)
export const setCurrentWorld = ({ commit }, world) => commit('setCurrentWorld', world)
export const setWorlds = ({ commit }, worlds) => commit('setWorlds', worlds)
