<template>
  <admin-viewport
    id="admin-articles"
    title="Articles"
    :breadcrumbs="breadcrumbs"
    :loading="isLoading"
  >
    <el-row>
      <el-col :sm="12">
        <el-pagination
          layout="prev, pager, next"
          :total="articles.total"
          :page-size="articles.per_page"
          @current-change="fetch">
        </el-pagination>
      </el-col>
      <el-col :sm="12" class="content-right">
        <el-button type="primary" @click="dialogCreateVisible = true">Create Article</el-button>
      </el-col>
    </el-row>

    <separator />

    <el-table :data="articles.data">
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        prop="world_name"
        label="World">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="Author">
      </el-table-column>
      <el-table-column align="right">
        <template scope="article">
          <el-button
            size="small"
            @click="edit(article.row)">Edit</el-button>
          <el-button
            size="small"
            type="danger"
            @click="destroy(article.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <edit-dialog
      :visible="dialogCreateVisible"
      v-on:close="dialogCreateVisible = false"
      v-on:save="created"
    ></edit-dialog>
    <edit-dialog
      :article="article"
      :visible="dialogEditVisible"
      v-on:close="dialogEditVisible = false"
      v-on:save="edited"
    ></edit-dialog>
  </admin-viewport>
</template>

<script>
import debounce from 'debounce'
import strings from 'src/strings/article'

import EditDialog from 'src/Components/Article/Edit'

export default {
  components: {
    EditDialog
  },
  data () {
    return {
      breadcrumbs: [
        { label: 'Articles' }
      ],
      articles: {},
      article: {},
      dialogCreateVisible: false,
      dialogEditVisible: false,
      searching: false,
      worlds: {},
      newWorld: null
    }
  },
  created () {
    this.$startLoading()
    this.fetch()

    this.searchUsers = debounce(this.searchUsers, 400)
  },
  methods: {
    fetch (page) {
      this.$fetch('articles', page, 'articles')
    },
    edit (article) {
      this.article = Object.assign({}, article)
      this.article.verified = this.article.verified == 1
      this.dialogEditVisible = true
    },
    save () {
      this.$startLoading()

      const data = {
        verified: this.article.verified
      }

      if (this.newWorld) {
        data['user_id'] = this.newWorld.id
      }

      this.$http.patch(`articles/${this.article.id}`, data).then(response => {
        this.$message.success(strings.update_succeeded)
        this.dialogEditVisible = false
        this.fetch()
        this.$doneLoading()
      })
    },
    destroy (article) {
      this.$prompt(strings.confirm_deletion, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showInput: false
      }).then(() => {
        this.$startLoading()

        this.$http.delete(`articles/${article.id}`).then(response => {
          this.$message.success(strings.deletion_succeeded)
          this.fetch()
          this.$doneLoading()
        })
      }).catch(() => {
      })
    },
    created (article) {
      this.dialogCreateVisible = false
      this.fetch()
    },
    edited (article) {
      this.dialogEditVisible = false
      this.fetch()
    }
  }
}
</script>

<style lang="scss">
#admin-articles {
  .avatar {
    width: 48px;
    border-radius: 3px;
    margin: 8px 0 0 0;
  }
}
</style>
