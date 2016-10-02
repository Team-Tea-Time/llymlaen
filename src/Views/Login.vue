<template>
  <div id="user-login">
    <page-header>
      <slot slot="title">Log in</slot>
      <slot slot="subtitle"></slot>
    </page-header>
    <content-container>
      <input-text label="Username or email address" :value.sync="identity"></input-text>
      <input-password label="Password" :value.sync="password"></input-password>
      <input-button @click="submit">Proceed</input-button>
    </content-container>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

import ContentContainer from '../Layout/Content'
import InputButton from '../Input/Button'
import InputPassword from '../Input/Password'
import InputText from '../Input/Text'
import PageHeader from '../Layout/PageHeader'

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
      password: null
    }
  },
  computed: {
    user () {
      return store.state.user
    }
  },
  methods: {
    submit () {
      this.$http.post('auth/login', {identity: this.identity, password: this.password}).then((response) => {
        console.log('Authentication succeeded')
        console.log(jwtDecode(response.data.token))
      }, (response) => {
        console.log('Authentication failed')
        console.log(response)
      })
    }
  }
}
</script>
