export function Validation(Vue) {
  Vue.prototype.$setValidationErrors = function (response) {
    let key = null

    for (key in response.body) {
      this.$set(this.errors, key, response.body[key][0])
    }
  }

  Vue.prototype.$clearValidationErrors = function () {
    this.$set(this, 'errors', {})
  }
}
