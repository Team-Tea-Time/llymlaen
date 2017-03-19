<template>
</template>

<script>
export default {
  mounted: function () {
    this.$http.post('/api/user/verify', {
      code: this.$route.params.code
    }).then((response) => {
      this.$message.success("Email address confirmed! You may now log in.")
      this.$router.push('/user/login')
    }, (response) => {
      this.$message.error("Confirmation failed. The email address you're trying to confirm may already be confirmed; please contact us if this is not the case.")
      this.$router.push('/user/login')
    })
  }
}
</script>
