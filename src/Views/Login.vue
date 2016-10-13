<template>
  <div id="user-login">
    <page-header>
      <slot slot="title">Log in</slot>
      <slot slot="subtitle"></slot>
    </page-header>
    <content-container>
      <input-text label="Username or email address" v-model="identity"></input-text>
      <input-password label="Password" v-model="password"></input-password>
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

import store from '../store'

import Alert from '../Content/Alert'

export default {
  components: {
    Alert,
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
    submit: function () {
      this.$http.post('auth/login', {identity: this.identity, password: this.password}).then((response) => {
        this.$cookie.set('token', response.data.token, 14)
        this.$router.path('/')
      }, (response) => {
        console.log('Authentication failed')
        console.log(response)
      })
    }
  }
}
</script>
