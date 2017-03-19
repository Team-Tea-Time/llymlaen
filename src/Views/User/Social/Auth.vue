<template>
</template>

<script>
export default {
  created () {
    const provider = this.$route.params.provider

    this.$http.get(`/api/social/${provider}/auth`).then(response => {
      window.location.replace(response.body)
    })
  }
}
</script>
