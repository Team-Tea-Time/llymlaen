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
        </el-col>
      </el-row>
    </content-container>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  data () {
    return {
      identity: '',
      password: '',
      errors: {
        username: null,
        password: null
      }
    }
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

      this.$http.post('/oauth/token', data).then((response) => {
        this.$http.get('/api/user').then((response) => {
          const user = response.body

          this.$store.commit('setAuth', user)
          Message.success(`Hello, ${user.name}!`)
        })

        this.$router.push('/')
      }, (response) => {
        if (response.status === 422) {
          this.$setValidationErrors(response)
        } else {
          Message.error('Login request failed. :(')
          this.$clearLoading()
        }
      })
    }
  }
}
</script>
