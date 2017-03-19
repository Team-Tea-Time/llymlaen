<template>
</template>

<script>
import { attemptAuth } from '../../../auth'

export default {
  created () {
    const provider = this.$route.params.provider
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    this.$http.get(`/api/social/${provider}/auth/receive?code=${code}`).then(response => {
      let message = `Hello, ${response.body.user.name}!`
      let duration = 8000

      if (response.body.state.user_is_new) {
        message = `${message} An account has been created for you. Please check your emails to verify your email address.`
      } else if (response.body.state.user_has_new_auth) {
        message = `${message} A user account matching your details has been found and linked for you.`
      }

      if (response.body.state.user_is_new) {
        this.$message.success({ message, duration })
      } else {
        attemptAuth(message)
      }
    }, () => {
      this.$message.error('Login request failed. :(')
    })

    this.$router.push('/')
  }
}
</script>
