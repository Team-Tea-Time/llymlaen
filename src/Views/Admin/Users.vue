<template>
  <admin-viewport
    id="admin-users"
    title="Users"
    :breadcrumbs="breadcrumbs"
    :loading="isLoading"
  >
    <el-pagination
      layout="prev, pager, next"
      :total="users.total"
      :page-size="users.per_page"
      @current-change="fetch">
    </el-pagination>
    <hr class="separator" />
    <el-table :data="users.data">
      <el-table-column
        prop="name"
        label="Username">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email address">
      </el-table-column>
      <el-table-column
        prop="role_list"
        label="Role(s)">
      </el-table-column>
      <el-table-column label="Verified">
        <template scope="user">
          <span v-if="user.row.verified == 1" class="status verified">
            Verified
          </span>
          <span v-else class="status unverified">
            Unverified
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Active">
        <template scope="user">
          <span v-if="user.row.active == 1" class="status active">
            Active
          </span>
          <span v-else class="status inactive">
            Inactive
          </span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template scope="user">
          <el-button
            size="small"
            @click="edit(user.row)">Edit</el-button>
          <el-button
            size="small"
            type="danger"
            @click="destroy(user.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="`Edit user: ${user.name}`" v-model="dialogEditVisible">
      <el-form :model="user">
        <el-form-item label="Verified">
          <el-switch
            v-model="user.verified"
            on-text=""
            off-text=""
          />
          <br>
          Unverified users have limited access to the site.
        </el-form-item>
        <el-form-item label="Active">
          <el-switch
            v-model="user.active"
            on-text=""
            off-text=""
          />
          <br>
          Inactive users cannot log in.
        </el-form-item>
      </el-form>
      <separator />
      <h2>Social Authentications</h2>
      <el-table :data="user.auths">
        <el-table-column
          prop="driver.capitalised_name"
          label="Provider"
        />
        <el-table-column align="right">
          <template scope="auths">
            <el-button
              size="small"
              type="danger"
              @click="disconnectAuth(auth.row)">Disconnect</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Save</el-button>
      </span>
    </el-dialog>
  </admin-viewport>
</template>

<script>
import strings from 'src/strings/user'

export default {
  data () {
    return {
      breadcrumbs: [
        { label: 'Users' }
      ],
      users: {},
      user: {},
      dialogEditVisible: false
    }
  },
  created () {
    this.$setLoading()
    this.fetch()
  },
  methods: {
    fetch (page) {
      this.$fetch('users', page, 'users')
    },
    edit (user) {
      this.user = Object.assign({}, user)
      this.user.verified = this.user.verified == 1
      this.user.active = this.user.active == 1
      this.dialogEditVisible = true
    },
    save () {
      this.$setLoading()

      this.$http.patch(`users/${this.user.id}`, {
        verified: this.user.verified,
        active: this.user.active
      }).then(response => {
        this.$message.success(strings.update_succeeded)
        this.dialogEditVisible = false
        this.fetch()
        this.$clearLoading()
      })
    },
    destroy (user) {
      this.$prompt(strings.confirm_deletion, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showInput: true,
        inputValidator: value => {
          return value === user.name
        },
        inputErrorMessage: strings.name_mismatch
      }).then(() => {
        this.$setLoading()

        this.$http.delete(`users/${user.id}`).then(response => {
          this.$message.success(strings.deletion_successful)
          this.fetch()
          this.$clearLoading()
        })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
