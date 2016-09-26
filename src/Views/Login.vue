<template>
  <div id="user-login">
    <page-header>
      <slot slot="title">Log in</slot>
      <slot slot="subtitle"></slot>
    </page-header>
    <content>
      <input-text label="Username" :value.sync="username"></input-text>
      <input-password label="Password" :value.sync="password"></input-password>
      <input-button>Proceed</input-button>
    </content>
  </div>
</template>

<script>
import Content from '../Layout/Content'
import InputButton from '../Input/Button'
import InputPassword from '../Input/Password'
import InputText from '../Input/Text'
import PageHeader from '../Layout/PageHeader'

export default {
  components: {
    Content,
    PageHeader,
    InputButton,
    InputPassword,
    InputText
  },
  data () {
    return {
      username: null,
      password: null
    }
  }
}
</script>
