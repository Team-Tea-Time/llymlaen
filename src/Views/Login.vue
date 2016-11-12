<template>
  <div id="user-login">
    <page-header>
      <slot slot="title">Log in</slot>
      <slot slot="subtitle"></slot>
    </page-header>
    <content-container>
      <input-text
        label="Username or email address"
        :error="errors.username"
        v-model="identity"
      ></input-text>
      <input-password
        label="Password"
        :error="errors.password"
        v-model="password"
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
      identity: null,
      password: null,
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

      this.$http.post('/oauth/proxy/token', data).then((response) => {
        console.log(response)

        // Encode the response body and throw it into a cookie here

        router.push('/')
      }, (response) => {
        if (response.status === 422) {
          extractValidationMessages(response.body, (key, message) => {
            this.$set(this.errors, key, message)
          })
        } else {
          store.commit('addAlert', {
            type: 'error',
            message: 'Authentication request failed. Please try again or contact us if the issue persists.',
            persist: false
          })
        }
      })
    }
  }
}
</script>
