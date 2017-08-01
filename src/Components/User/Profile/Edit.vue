<template>
  <el-dialog
    ref="dialog"
    title="Editing user profile"
    class="user-profile-edit"
    size="large"
    v-on:close="$emit('close')"
    :visible.sync="isVisible"
  >
    <div v-loading="isLoading">
      <markdown-editor v-model="profile.body" :configs="config" />
      <div class="avatar-upload">
        <h3>Avatar</h3>
        <upload
          ref="avatar"
          accept="image/jpg,image/jpeg,image/png"
          v-on:selection="selectAvatar"
        />
        <img v-if="!selectedAvatar" :src="profile.avatar || defaultAvatar" class="preview">
        <vue-cropper
          v-else
          ref="cropper"
          drag-mode="crop"
          :src="selectedAvatar"
          :aspectRatio="1"
          :view-mode="2"
          class="cropper"
          :imgStyle="{height: '300px'}"
        />
        <el-button
          type="danger"
          v-if="user.profile && user.profile.avatar"
          @click="deleteAvatar"
        >
          Remove avatar
        </el-button>
      </div>
      <div class="content-right">
        <el-button @click="$emit('close')">Cancel</el-button>
        <el-button type="primary" @click="save">Save</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { markdownEditor } from 'vue-simplemde'
import VueCropper from 'vue-cropperjs'

import strings from 'src/strings/user'
import Upload from 'src/Components/Upload'

export default {
  components: {
    markdownEditor,
    Upload,
    VueCropper
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: {
        profile: {
          body: '',
          avatar: null
        }
      }
    }
  },
  watch: {
    visible (visible) {
      this.isVisible = visible
    }
  },
  data () {
    return {
      config: {
        autofocus: true,
        spellChecker: false
      },
      profile: {
        body: '',
        avatar: null
      },
      defaultAvatar: '/static/images/user_default_avatar.jpg',
      selectedAvatar: null,
      isVisible: false
    }
  },
  created () {
    this.profile = this.user.profile
  },
  methods: {
    selectAvatar (file) {
      if (file) {
        let url = URL.createObjectURL(file)

        if (this.selectedAvatar) {
          this.$refs.cropper.replace(url)
        }

        this.selectedAvatar = url
      } else {
        this.$refs.cropper.destroy()
        this.selectedAvatar = null
      }
    },
    deleteAvatar () {
      this.$confirm(strings.confirm_profile_avatar_deletion, 'Warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$startLoading()

        this.$http.delete(`users/${this.user.id}/profile/avatar`).then(response => {
          this.$message.success(strings.profile_avatar_deletion_succeeded)
          this.$doneLoading()
          this.clearAvatarInput()
          this.profile.avatar = null
        })
      })
    },
    getCroppedAvatar () {
      return new Promise(resolve => {
        this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    },
    save () {
      this.$startLoading()

      let data = new FormData()
      data.append('body', this.profile.body)

      if (this.selectedAvatar) {
        this.getCroppedAvatar().then(blob => {
          data.append('avatar', blob)
          this.submit(data)
        })
      } else {
        this.submit(data)
      }
    },
    submit (data) {
      this.$http.post(`users/${this.user.id}/profile`, data).then(response => {
        this.$message.success(strings.profile_save_succeeded)
        this.$doneLoading()
        this.$emit('save', response.body)
        this.clearAvatarInput()
        this.profile = response.body
      })
    },
    clearAvatarInput () {
      this.$refs.avatar.$refs.file.value = ''
      this.$refs.avatar.selection = null
      this.selectedAvatar = null
    }
  }
}
</script>

<style lang="scss">
.user-profile-edit {
  .avatar-upload {
    margin: 20px 0;
    text-align: center;

    .preview {
      display: block;
      max-width: 120px;
      margin: 20px auto;
      border-radius: 100%;
    }

    .cropper {
      margin: 20px 0;
    }
  }
}
</style>
