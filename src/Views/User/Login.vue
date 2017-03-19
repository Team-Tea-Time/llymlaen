<template>
  <div id="user-login">
    <page-header title="Log in" />
    <content-container>
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
    </content-container>
  </div>
</template>

<script>
import { attemptAuth } from '../../auth'

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
    this.$http.get('/api/social/drivers').then(response => {
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

      this.$clearValidationErrors()
      this.$setLoading()

      this.$http.post('/oauth/token', data).then(() => {
        attemptAuth()
        this.$router.push('/')
      }, response => {
        if (response.status === 422) {
          this.$setValidationErrors(response)
        } else {
          this.$message.error({
            message: "Login failed. Please make sure your account email address is verified, or get in touch if there's a problem.",
            duration: 8000
          })
          this.$clearLoading()
        }
      })
    }
  }
}
</script>
