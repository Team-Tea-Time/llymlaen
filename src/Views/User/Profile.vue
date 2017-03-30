<template>
  <viewport
    id="user-profile"
    :title="user.name"
    subtitle="User Profile"
    :loading="isLoading"
  >
    <avatar :profile="user.profile" :with-border="true" />
    <br>
    <div v-if="canEdit">
      <div class="content-centre">
        <el-button @click="dialogEditVisible = true" icon="edit">Edit Profile</el-button>
      </div>
      <edit-dialog
        :user="user"
        v-if="user.profile.id"
        :visible="dialogEditVisible"
        v-on:close="dialogEditVisible = false"
        v-on:save="saved"
      />
    </div>
    <br>
    <div class="body" v-html="bodyParsed">
    </div>
    <el-alert
      v-if="!bodyParsed && user.id === $store.state.auth.user.id"
      title="You haven't written a profile yet, kupo!"
      type="info"
      :closable="false"
    />
  </viewport>
</template>

<script>
import marked from 'marked'

import { userHasRole } from 'src/auth'
import EditDialog from 'src/Components/User/Profile/Edit'
import Avatar from 'src/Components/User/Profile/Avatar'

export default {
  components: {
    EditDialog,
    Avatar
  },
  data () {
    return {
      dialogEditVisible: false,
      user: {
        name: 'Loading...',
        profile: {
          avatar: null
        }
      }
    }
  },
  computed: {
    canEdit () {
      let user = this.$store.state.auth.user
      return user.id === this.user.id || userHasRole(user, 'XIV World Staff')
    },
    bodyParsed () {
      if (this.user.profile.body) {
        return marked(this.user.profile.body)
      }

      return null
    }
  },
  created () {
    this.$setLoading()

    this.$http.get(`/api/users/by-name/${this.$route.params.username}`).then(response => {
      this.user = response.body
      this.$clearLoading()
    })
  },
  methods: {
    saved (profile) {
      this.dialogEditVisible = false
      this.user.profile = profile
    }
  }
}
</script>

<style lang="scss">
#user-profile {
  .avatar {
    position: absolute;
    left: 50%;
    top: -53px;
    margin-left: -53px;
  }
}
</style>
