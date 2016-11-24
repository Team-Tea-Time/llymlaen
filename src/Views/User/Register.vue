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
              {{ errors.name }}
            </el-form-item>

            <el-form-item>
              <el-input
                type="email"
                placeholder="Email address"
                v-model="email"
                :error="errors.email"
              >
              </el-input>
              {{ errors.email }}
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

      this.$http.post('/api/user', data).then((response) => {
        Message.success('Account created. Please check your inbox for the confirmation email we just sent you!')
        router.push('/user/login')
      }, (response) => {
        this.$setValidationErrors(response)
      })
    }
  }
}
</script>
