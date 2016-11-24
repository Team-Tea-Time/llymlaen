<template>
  <div id="user-login">
    <page-header title="Log in" />
    <content-container>
      <el-row>
        <el-col :md="{span: 12, offset: 6}">
          <el-form>
            <el-form-item>
              <el-input
                placeholder="Username or email address"
                v-model="identity"
                :error="errors.username"
              >
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                type="password"
                placeholder="Password"
                v-model="password"
                :error="errors.password"
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

import router from '../../router'

export default {
  data () {
    return {
      identity: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    submit: function () {
      const data = {
        grant_type: 'password',
        username: this.identity,
        password: this.password
      }

      this.$set(this, 'errors', {})

      this.$http.post('/oauth/token', data).then((response) => {
        console.log(response)

        // Encode the response body and throw it into a cookie here

        router.push('/')
      }, (response) => {
        if (response.status === 422) {
          this.$setValidationErrors(response)
        } else {
          Message.error('Authentication request failed. Please try again or contact us if the issue persists.')
        }
      })
    }
  }
}
</script>
