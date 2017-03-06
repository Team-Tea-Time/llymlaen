export default {
  auth () {
    return {
      authenticated: false,
      user: {
        id: 0,
        name: 'Guest',
        email: null,
        roles: []
      }
    }
  }
}
