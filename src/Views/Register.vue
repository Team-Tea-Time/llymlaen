<template>
  <div id="user-registration">
    <page-header>
      <slot slot="title">Register</slot>
      <slot slot="subtitle"></slot>
    </page-header>
    <content-container>
      <input-text
        label="Name"
        description="Unique username. Can contain spaces."
        :error="errors.name"
        v-model="name"
      ></input-text>
      <input-text
        label="Email address"
        :error="errors.email"
        v-model="email"
      ></input-text>
      <input-password
        label="Password"
        :error="errors.password"
        v-model="password"
      ></input-password>
      <input-password
        label="Password confirmation"
        v-model="password_confirmation"
      ></input-password>
      <input-button :click="submit">Proceed</input-button>
    </content-container>
  </div>
</template>

<script>
import ContentContainer from '../Layout/Content'
import InputButton from '../Input/Button'
import InputPassword from '../Input/Password'
import InputText from '../Input/Text'
import PageHeader from '../Layout/PageHeader'

import {extractValidationMessages} from '../Utils/Validation'

import router from '../router'
import store from '../store'

export default {
  components: {
    ContentContainer,
    PageHeader,
    InputButton,
    InputPassword,
    InputText
  },
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
