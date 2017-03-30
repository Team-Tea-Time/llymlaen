<template>
  <viewport
    id="user-profile"
    :title="user.name"
    subtitle="User Profile"
    :loading="isLoading"
  >
    <img class="avatar" :src="user.profile.avatar" />
    <br>
  </viewport>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: 'Loading...',
        profile: {
          avatar: null
        }
      }
    }
  },
  created () {
    this.$setLoading()

    this.$http.get(`/api/users/by-name/${this.$route.params.username}`).then(response => {
      this.user = response.body
      this.$clearLoading()
    })
  }
}
</script>
