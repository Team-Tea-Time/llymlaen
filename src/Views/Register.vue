<template>
  <div id="user-registration">
    <page-header title="Register" subtitle="And get a free bag of Moogle Munch!" />
    <content-container>
      <el-row>
        <el-col :md="{span: 12, offset: 6}">
          <el-form>
            <el-form-item>
              <el-input
                placeholder="Name"
                v-model="name"
                :error="errors.name"
              >
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                type="email"
                placeholder="Email address"
                v-model="email"
                :error="errors.email"
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

            <el-form-item>
              <el-input
                type="password"
                placeholder="Password confirmation"
                v-model="password_confirmation"
              >
              </el-input>
            </el-form-item>

            <div class="content-right">
              <el-button type="primary" size="large" :click="submit">Proceed</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </content-container>
  </div>
</template>

<script>
import {extractValidationMessages} from '../Utils/Validation'

import router from '../router'
import store from '../store'

export default {
  data () {
    return {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      errors: {}
    }
  },
  methods: {
    submit: function () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }

      this.$set(this, 'errors', {})

      this.$http.post('/api/user/create', data).then((response) => {
        store.commit('addAlert', {
          type: 'info',
          message: 'Account created. Please check your emails to confirm your account.',
          persist: false
        })
        router.push('/user/login')
      }, (response) => {
        extractValidationMessages(response.body, (key, message) => {
          this.$set(this.errors, key, message)
        })
      })
    }
  }
}
</script>
