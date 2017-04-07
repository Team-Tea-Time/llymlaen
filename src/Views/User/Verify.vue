<template>
</template>

<script>
import strings from 'src/strings/user'

export default {
  mounted () {
    this.$http.post('users/verify', {
      code: this.$route.params.code
    }).then(response => {
      this.$message.success(strings.email_confirmation_succeeded)
      this.$router.push('/user/login')
    }, response => {
      this.$message.error(strings.email_confirmation_failed)
      this.$router.push('/user/login')
    })
  }
}
</script>
