<template>
</template>

<script>
export default {
  created () {
    const provider = this.$route.params.provider

    this.$http.get(`social/${provider}/auth`).then(response => {
      window.location.replace(response.body)
    })
  }
}
</script>
