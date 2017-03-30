<template>
  <viewport
    id="user-password-reset"
    title="Set new password"
  >
    <el-row>
      <el-col :md="{span: 12, offset: 6}" v-loading.body="isLoading">
        <el-form>
          <el-form-item :error="errors.email">
            <el-input
              type="email"
              placeholder="Email address"
              v-model="email"
              v-focus
            >
            </el-input>
          </el-form-item>

          <el-form-item :error="errors.password">
            <el-input
              type="password"
              placeholder="Password"
              v-model="password"
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input
              type="password"
              placeholder="Password (confirmation)"
              v-model="password_confirmation"
              @keyup.enter.native="submit"
            >
            </el-input>
          </el-form-item>

          <div class="content-right">
            <el-button type="primary" size="large" @click="submit">Proceed</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </viewport>
</template>

<script>
import strings from 'src/strings/user'

export default {
  data () {
    return {
      token: this.$route.params.token,
      email: null,
      password: null,
      password_confirmation: null,
      errors: {
        token: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    submit () {
      this.$setLoading()

      this.$http.post('/api/auth/password/reset', {
        token: this.token,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }).then(response => {
        this.$message.success(strings.password_reset_succeeded)
        this.$clearLoading()

        if (this.$store.state.auth.authenticated) {
          this.$router.push('/user/settings')
        } else {
          this.$router.push('/user/login')
        }
      }, response => {
        this.$setValidationErrors(response)
        this.$clearLoading()
      })
    }
  }
}
</script>
