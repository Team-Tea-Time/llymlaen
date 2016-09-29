<template>
  <div id="user-login">
    <page-header>
      <slot slot="title">Log in</slot>
      <slot slot="subtitle"></slot>
    </page-header>
    <content>
      <div v-if="user.id > 0">
        ID: {{ user.id }}<br>
        Username: {{ user.name }}
      </div>
      <input-text label="Username or email address" :value.sync="identity"></input-text>
      <input-password label="Password" :value.sync="password"></input-password>
      <input-button @click="submit">Proceed</input-button>
    </content>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

import Content from '../Layout/Content'
import InputButton from '../Input/Button'
import InputPassword from '../Input/Password'
import InputText from '../Input/Text'
import PageHeader from '../Layout/PageHeader'

import { setUser } from '../vuex/actions'
import { user } from '../vuex/getters'

export default {
  components: {
    Content,
    PageHeader,
    InputButton,
    InputPassword,
    InputText
  },
  vuex: {
    getters: {
      user
    },
    actions: {
      setUser
    }
  },
  data () {
    return {
      identity: null,
      password: null
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
