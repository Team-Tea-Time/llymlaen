export function LoadingState(Vue) {
  Vue.mixin({
    data () {
      return {
        isLoading: false
      }
    }
  })

  Vue.prototype.$startLoading = function () {
    this.$set(this, 'isLoading', true)
  }

  Vue.prototype.$doneLoading = function () {
    this.$set(this, 'isLoading', false)
  }
}
