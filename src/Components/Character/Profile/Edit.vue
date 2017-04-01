<template>
  <el-dialog
    ref="dialog"
    :title="(!character.profile ? 'Create ' : 'Edit ') + `profile for ${character.name}`"
    class="character-profile-edit"
    size="large"
    v-on:close="$emit('close')"
  >
    <div v-loading="isLoading">
      <markdown-editor v-model="profile.body" :configs="config" />
      <div class="portrait-upload">
        <h3>Portrait</h3>
        <p v-if="!character.profile || !character.profile.portrait">
          Select a portrait to override the Lodestone one.
        </p>
        <upload
          ref="portrait"
          accept="image/jpg,image/jpeg,image/png"
          v-on:selection="selectPortrait"
        />
        <br>
        <img
          :src="selectedPortrait || character.profile.portrait || character.portrait"
          class="preview"
        />
        <br>
        <el-button
          type="danger"
          v-if="character.profile && character.profile.portrait"
          @click="deletePortrait"
        >
          Remove portrait
        </el-button>
      </div>
      <br>
      <div class="content-right">
        <el-button @click="$emit('close')">Cancel</el-button>
        <el-button type="primary" @click="save">Save</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { markdownEditor } from 'vue-simplemde'

import strings from 'src/strings/character'
import Upload from 'src/Components/Upload'

export default {
  components: {
    markdownEditor,
    Upload
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    character: {
      type: Object,
      default: {
        profile: {
          body: '',
          portrait: null
        }
      }
    }
  },
  watch: {
    visible (visible) {
      visible ? this.$refs.dialog.open() : this.$refs.dialog.close()
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
        portrait: null
      },
      selectedPortrait: null
    }
  },
  created () {
    if (this.character.profile) {
      this.profile = this.character.profile
    }
  },
  methods: {
    selectPortrait (file) {
      this.selectedPortrait = file ? URL.createObjectURL(file) : null
    },
    deletePortrait () {
      this.$confirm(strings.confirm_profile_portrait_deletion, 'Warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$setLoading()

        this.$http.delete(`/api/characters/${this.character.id}/profile/portrait`).then(response => {
          this.$message.success(strings.profile_portrait_deletion_succeeded)
          this.$clearLoading()
          this.clearPortraitInput()
        })
      })
    },
    save () {
      this.$setLoading()

      let data = new FormData()
      data.append('body', this.profile.body)
      data.append('portrait', this.profile.portrait)

      this.$http.post(`/api/characters/${this.character.id}/profile`, data).then(response => {
        this.$message.success(strings.profile_save_succeeded)
        this.$clearLoading()
        this.$emit('save', response.body)
        this.clearPortraitInput()
      })
    },
    clearPortraitInput () {
      this.$refs.portrait.$refs.file.value = ''
      this.$refs.portrait.selection = null
      this.selectedPortrait = null
    }
  }
}
</script>

<style lang="scss">
.character-profile-edit {
  .portrait-upload {
    text-align: center;

    .preview {
      max-width: 260px;
      margin: 20px 0;
      border-radius: 5px;
    }
  }
}
</style>
