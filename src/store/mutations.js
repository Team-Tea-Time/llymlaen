import shortid from 'shortid'

export const setUser = (state, user) => {
  state.user = user
}

export const addAlert = (state, alert) => {
  alert = Object.assign({}, {id: shortid.generate()}, alert)

  state.alerts.push(alert)
}

export const removeAlert = (state, id) => {
  let index = state.alerts.findIndex((alert) => {
    alert.id === id
  })

  state.alerts.splice(index, 1)
}
