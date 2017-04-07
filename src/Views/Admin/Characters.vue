<template>
  <admin-viewport
    id="admin-characters"
    title="Characters"
    :breadcrumbs="breadcrumbs"
    :loading="isLoading"
  >
    <el-pagination
      layout="prev, pager, next"
      :total="characters.total"
      :page-size="characters.per_page"
      @current-change="fetch">
    </el-pagination>

    <separator />

    <el-table :data="characters.data">
      <el-table-column :width="64">
        <template scope="character">
          <img :src="character.row.avatar" alt="" class="avatar" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="Owner">
      </el-table-column>
      <el-table-column label="Verified">
        <template scope="character">
          <span v-if="character.row.verified == 1" class="status verified">
            Verified
          </span>
          <span v-else class="status unverified">
            Unverified
          </span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template scope="character">
          <el-button
            size="small"
            @click="edit(character.row)">Edit</el-button>
          <el-button
            size="small"
            type="danger"
            @click="destroy(character.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="`Edit character: ${character.name}`" v-model="dialogEditVisible">
      <el-form :model="character">
        <el-form-item label="Owner:">
          <strong>{{ character.user_name }}</strong>
          <el-select
            v-model="newOwner"
            filterable
            remote
            placeholder="Search by username..."
            loading-text="Searching..."
            :remote-method="searchUsers"
            :loading="searching">
            <el-option
              v-for="user in users"
              :key="user.id"
              :label="user.name"
              :value="user">
            </el-option>
          </el-select>
          <div v-if="newOwner">
            You've selected <strong>{{ newOwner.name }}</strong>
          </div>
        </el-form-item>
        <separator />
        <el-form-item label="Verified">
          <el-switch
            v-model="character.verified"
            on-text=""
            off-text=""
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Save</el-button>
      </span>
    </el-dialog>
  </admin-viewport>
</template>

<script>
import debounce from 'debounce'
import strings from 'src/strings/character'

export default {
  data () {
    return {
      breadcrumbs: [
        { label: 'Characters' }
      ],
      characters: {},
      character: {},
      dialogEditVisible: false,
      searching: false,
      users: {},
      newOwner: null
    }
  },
  created () {
    this.$setLoading()
    this.fetch()

    this.searchUsers = debounce(this.searchUsers, 400)
  },
  methods: {
    fetch (page) {
      this.$fetch('characters', page, 'characters')
    },
    searchUsers (name) {
      if (name !== '' && name.length > 2) {
        this.searching = true
        this.$http.post('users/search', { name }).then(response => {
          this.users = response.body
          this.searching = false
        })
      }
    },
    edit (character) {
      this.character = Object.assign({}, character)
      this.character.verified = this.character.verified == 1
      this.dialogEditVisible = true
    },
    save () {
      this.$setLoading()

      const data = {
        verified: this.character.verified
      }

      if (this.newOwner) {
        data['user_id'] = this.newOwner.id
      }

      this.$http.patch(`characters/${this.character.id}`, data).then(response => {
        this.$message.success(strings.update_succeeded)
        this.dialogEditVisible = false
        this.fetch()
        this.$clearLoading()
      })
    },
    destroy (character) {
      this.$prompt(strings.confirm_removal, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showInput: true,
        inputValidator: value => {
          return value === character.name
        },
        inputErrorMessage: strings.name_mismatch
      }).then(() => {
        this.$setLoading()

        this.$http.delete(`characters/${character.id}`).then(response => {
          this.$message.success(strings.removal_succeeded)
          this.fetch()
          this.$clearLoading()
        })
      })
    }
  }
}
</script>

<style lang="scss">
#admin-characters {
  .avatar {
    width: 48px;
    border-radius: 3px;
    margin: 8px 0 0 0;
  }
}
</style>
