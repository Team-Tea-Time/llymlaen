export function LoadingState(Vue) {
  Vue.mixin({
    data () {
      return {
        isLoading: false
      }
    }
  })

  Vue.prototype.$setLoading = function () {
    this.$set(this, 'isLoading', true)
  }

  Vue.prototype.$clearLoading = function () {
    this.$set(this, 'isLoading', false)
  }
}
