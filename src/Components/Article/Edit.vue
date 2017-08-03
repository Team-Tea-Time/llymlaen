<template>
  <el-dialog
    ref="dialog"
    :title="(!model.id ? 'Create ' : 'Edit ') + `article: ${model.title}`"
    class="character-article-edit"
    size="large"
    v-on:close="$emit('close')"
    :visible.sync="isVisible"
  >
    <el-form :model="model">
      <el-form-item label="World">
        <el-select
          v-model="model.world"
          filterable
          remote
          placeholder="Search by world name..."
          loading-text="Searching..."
          :remote-method="searchWorlds"
          :loading="searching">
          <el-option
            v-for="world in worlds"
            :key="world.id"
            :label="world.name"
            :value="world">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Title" :error="errors.title">
        <el-input
          placeholder="Title"
          v-model="model.title"
          v-focus
        >
        </el-input>
      </el-form-item>
      <el-form-item :error="errors.body">
        <markdown-editor v-model="model.body" :configs="config" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="save">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { markdownEditor } from 'vue-simplemde'

import strings from 'src/strings/article'

export default {
  components: {
    markdownEditor
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object,
      default: () => {
        return {
          id: null,
          world: null,
          title: null,
          body: null
        }
      }
    }
  },
  watch: {
    visible (visible) {
      this.isVisible = visible
      this.model = this.article
    }
  },
  data () {
    return {
      config: {
        autofocus: true,
        spellChecker: false
      },
      model: {
        id: null,
        world: null,
        title: null,
        body: null
      },
      searching: false,
      worlds: null,
      isVisible: false,
      errors: {
        title: null,
        body: null
      }
    }
  },
  methods: {
    searchWorlds (name) {
      if (name !== '' && name.length > 2) {
        this.searching = true
        this.$http.post('worlds/search', { name }).then(response => {
          this.worlds = response.body
          this.searching = false
        })
      }
    },
    save () {
      this.$startLoading()
      this.$resetValidation()

      let data = {
        world_id: this.model.world.id,
        title: this.model.title,
        body: this.model.body
      }

      let request = this.article.id
        ? this.$http.patch(`articles/${this.article.id}`, data)
        : this.$http.post('articles', data)

      request.then(response => {
        this.$message.success(strings.save_succeeded)
        this.$doneLoading()
        this.$emit('save', response.body)
      }, response => {
        this.$setValidationErrors(response)
        this.$doneLoading()
      })
    }
  }
}
</script>
