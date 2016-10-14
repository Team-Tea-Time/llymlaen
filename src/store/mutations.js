export const setUser = (state, user) => {
  state.user = user
}

export const addAlert = (state, alert) => {
  state.alerts.push(alert)
}
