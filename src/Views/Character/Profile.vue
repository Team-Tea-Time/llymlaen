<template>
  <viewport
    id="character-profile"
    :title="character.name"
    subtitle="Character Profile"
    :loading="isLoading"
  >

  </viewport>
</template>

<script>
export default {
  data () {
    return {
      character: {
        name: ''
      }
    }
  },
  created () {
    this.$setLoading()
    this.$http.get(`/api/characters/${this.$route.params.id}`).then(response => {
      this.character = response.body
      this.$clearLoading()
    })
  }
}
</script>

<style lang="scss">
</style>
