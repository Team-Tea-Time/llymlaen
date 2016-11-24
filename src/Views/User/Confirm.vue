<script>
import { Message } from 'element-ui'

import { extractValidationMessages } from '../../Utils/Validation'

import router from '../../router'

export default {
  data () {
    return {
      code: '',
      email: '',
      errors: {}
    }
  },
  mounted: function () {
    this.$http.post('/user/confirm', {code: this.$route.params.code}).then((response) => {
      console.log(response)

      // Handle the response

      router.push('/')
    }, (response) => {
      Message.error("Confirmation failed. The email address you're trying to confirm may already be confirmed; please contact us if this is not the case.")

      router.push('/user/login')
    })
  }
}
</script>
