export function Fetch(Vue) {
  Vue.mixin({
    data () {
      return {
        currentFetchPage: 1
      }
    }
  })

  Vue.prototype.$fetch = function (uri, page, key) {
    if (typeof page === 'undefined') {
      page = this.currentFetchPage
    } else {
      this.currentFetchPage = page
    }

    this.$startLoading()

    this.$http.get(`${uri}?page=${page}`).then(response => {
      this.$set(this, key, response.data)
      this.$doneLoading()
    })
  }
}
