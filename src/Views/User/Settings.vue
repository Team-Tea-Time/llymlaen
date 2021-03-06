<template>
  <viewport
    id="user-settings"
    title="Your Account"
  >
    <h3>Account Details</h3>
    <el-row>
      <el-col :span="12">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email address:</strong> {{ user.email }}</p>
        <p><strong>Joined:</strong> {{ user.created_at | moment('from') }}</p>
      </el-col>
      <el-col :span="12" class="roles">
        <p><strong>Roles:</strong></p>
        <el-tag v-for="role in user.roles" :color="role.colour">
          {{ role.name }}
        </el-tag>
      </el-col>
    </el-row>

    <separator />

    <h3>Social Authentications</h3>
    <el-table :data="user.auths">
      <el-table-column prop="driver.capitalised_name" label="Name" />
      <el-table-column label="Added">
        <template scope="auth">
          {{ auth.row.created_at | moment('LLLL') }}
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template scope="auth">
          <el-button
            size="small"
            type="danger"
            @click="destroyAuth(auth.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <separator />

    <h3>Credentials</h3>
    <el-form :model="credentials">
      <el-form-item label="Current password" :error="errors.current_password">
        <span class="note">Forgot your password or registered via social media? You can <el-button type="text" @click="requestPasswordReset">request a password reset</el-button>.</span>
        <el-input
          type="password"
          v-model="credentials.current_password"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="Username" :error="errors.username">
        <span class="note">Changing your username will make your old profile URL no longer work. <span class="right">Profile URL: {{ profileUrl }}</span></span>
        <el-input v-model="credentials.name" />
      </el-form-item>

      <el-form-item label="Email address" :error="errors.email">
        <el-input
          type="email"
          v-model="credentials.email"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="New password" :error="errors.password">
        <el-input
          type="password"
          placeholder="Enter a new password to change"
          v-model="credentials.password"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="New password (confirm)">
        <el-input
          type="password"
          placeholder="Confirm new password"
          v-model="credentials.password_confirmation"
        >
        </el-input>
      </el-form-item>

      <div class="content-right">
        <el-button type="primary" size="large" @click="updateCredentials">Save Credentials</el-button>
      </div>
    </el-form>
  </viewport>
</template>

<script>
import strings from 'src/strings/user'
import { getAuthUser } from 'src/auth'

export default {
  data () {
    return {
      errors: {
        username: null,
        password: null
      },
      credentials: null
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    profileUrl () {
      return `https://${window.location.host}/@${this.credentials.name.replace(' ', '+')}`
    }
  },
  created () {
    this.credentials = Object.assign({}, this.user)
  },
  methods: {
    destroyAuth (auth) {
      this.$confirm(strings.confirm_auth_deletion, 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$startLoading()

        this.$http.delete(`social/${auth.driver.name}/auth/${auth.id}`).then(response => {
          this.$message.success(strings.auth_deletion_succeeded)
          getAuthUser()
          this.$doneLoading()
        })
      })
    },
    updateCredentials () {
      this.$startLoading()

      this.$http.patch('users/me', this.credentials).then(response => {
        this.$message.success(strings.credentials_update_succeeded)
        getAuthUser().then(user => {
          this.credentials = Object.assign({}, user)
        })
        this.$doneLoading()
      }, response => {
        this.$setValidationErrors(response)
        this.$doneLoading()
      })
    },
    requestPasswordReset () {
      this.$confirm(strings.confirm_password_reset_request, 'Warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$startLoading()

        this.$http.post('auth/password/reset/request', {
          email: this.user.email
        }).then(response => {
          this.$message.success(strings.password_reset_request_succeeded)
          this.$doneLoading()
        })
      })
    }
  }
}
</script>

<style lang="scss">
#user-settings {
  .roles {
    .el-tag {
      color: #fff;
    }
  }
}
</style>
