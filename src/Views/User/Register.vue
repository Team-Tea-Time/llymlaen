<template>
  <viewport
    id="user-registration"
    title="Register"
    subtitle="And get a free bag of Moogle Munch!"
  >
    <el-row>
      <el-col :md="{span: 12, offset: 6}" v-loading.body="isLoading">
        <el-form>
          <el-form-item :error="errors.name">
            <el-input
              placeholder="Username"
              v-model="name"
              v-focus
            >
            </el-input>
          </el-form-item>

          <el-form-item :error="errors.email">
            <el-input
              type="email"
              placeholder="Email address"
              v-model="email"
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
              placeholder="Password confirmation"
              v-model="password_confirmation"
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
          <h2>Or register via...</h2>
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

import router from 'src/router'
import strings from 'src/strings/user'

export default {
  data () {
    return {
      drivers: [],
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      errors: {
        name: null,
        email: null,
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
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }

      this.$clearValidationErrors()
      this.$setLoading()

      this.$http.post('/api/user', data).then(response => {
        this.$message.success(sprintf(strings.greeting_account_created, data.name))
        router.push('/user/login')
      }, response => {
        this.$setValidationErrors(response)
        this.$clearLoading()
      })
    }
  }
}
</script>
