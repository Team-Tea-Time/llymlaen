<template>
  <div></div>
</template>

<script>
import { Message } from 'element-ui'

import router from '../../router'

export default {
  mounted: function () {
    this.$http.post('/api/user/confirm', {code: this.$route.params.code}).then((response) => {
      Message.success("Email address confirmed! You may now log in.")
      router.push('/user/login')
    }, (response) => {
      Message.error("Confirmation failed. The email address you're trying to confirm may already be confirmed; please contact us if this is not the case.")
      router.push('/user/login')
    })
  }
}
</script>
