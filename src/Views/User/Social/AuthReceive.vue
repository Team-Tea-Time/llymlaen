<template>
</template>

<script>
import { sprintf } from 'sprintf-js'

import { setAuth, getAuthUser } from 'src/auth'
import strings from 'src/strings/user'

export default {
  created () {
    const provider = this.$route.params.provider
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    this.$http.get(`social/${provider}/auth/receive?code=${code}`).then(response => {
      let data = response.body
      let message = sprintf(strings.greeting, {name: data.user.name})
      let duration = 8000

      if (data.state.user_is_new) {
        message = sprintf(strings.greeting_account_created, {name: data.user.name})
      } else if (data.state.user_has_new_auth) {
        message = sprintf(strings.greeting_account_linked, {name: data.user.name})
      }

      if (data.state.user_is_new) {
        this.$message.success({ message, duration })
      } else {
        setAuth(response.body.access_token, null, 7)
        getAuthUser().then(() => {
          this.$message.success({ message, duration })
        })
      }
    }, () => {
      this.$message.error(strings.login_failed)
    })

    this.$router.push('/')
  }
}
</script>
