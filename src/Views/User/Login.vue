<template>
  <viewport
    id="user-login"
    title="Log in"
  >
    <el-row>
      <el-col :md="{span: 12, offset: 6}" v-loading.body="isLoading">
        <el-form>
          <el-form-item :error="errors.username">
            <el-input
              placeholder="Username or email address"
              v-model="identity"
              v-focus
            >
            </el-input>
          </el-form-item>

          <el-form-item :error="errors.password">
            <el-input
              type="password"
              placeholder="Password"
              v-model="password"
              @keyup.enter.native="submit"
            >
            </el-input>
          </el-form-item>

          <div class="content-right">
            <el-button type="primary" size="large" @click="submit">Proceed</el-button>
          </div>
        </el-form>

        <separator :offset="false" />

        <div class="content-centre">
          <h2>Or log in via...</h2>
          <el-button
            v-for="driver in drivers"
            size="large"
            @click="$router.push(`/user/social/${driver.name}/auth`)"
          >
            {{ driver.capitalised_name }}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </viewport>
</template>

<script>
import { sprintf } from 'sprintf-js'

import { setAuth, getAuthUser } from 'src/auth'
import strings from 'src/strings/user'

export default {
  data () {
    return {
      drivers: [],
      identity: '',
      password: '',
      errors: {
        username: null,
        password: null
      }
    }
  },
  mounted () {
    this.$http.get('social/drivers').then(response => {
      this.drivers = response.body
    })
  },
  methods: {
    submit: function () {
      const data = {
        grant_type: 'password',
        client_id: 2,
        username: this.identity,
        password: this.password
      }

      this.$resetValidation()
      this.$startLoading()

      this.$http.post('auth/token', data).then(response => {
        let accessToken = response.body.access_token
        let refreshToken = response.body.refresh_token
        let expires = response.body.expires_in / 86400 // convert from seconds to days

        setAuth(accessToken, refreshToken, expires)
        getAuthUser().then(user => {
          this.$message.success(sprintf(strings.greeting, { name: user.name }))
        }, () => {
          this.$message.error({
            message: strings.login_failed,
            duration: 8000
          })
        })
        this.$router.push('/')
      }, response => {
        if (response.status === 422) {
          this.$setValidationErrors(response)
        } else {
          this.$message.error({
            message: strings.login_failed,
            duration: 8000
          })
          this.$doneLoading()
        }
      })
    }
  }
}
</script>
