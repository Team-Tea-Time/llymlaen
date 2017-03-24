import { getAuthUser, userHasRole } from '../auth'

function checkRole (role, next) {
  getAuthUser().then(user => {
    next(userHasRole(user, role))
  }, () => {
    next('/user/login')
  })
}

export default {
  guest (to, from, next) {
    getAuthUser().then(user => {
      next(false)
    }, () => {
      next()
    })
  },
  authenticated (to, from, next) {
    getAuthUser().then(user => {
      next()
    }, () => {
      next('/user/login')
    })
  },
  admin (to, from, next) {
    checkRole('XIV World Staff', next)
  }
}
