import Vue from 'vue'

Vue.directive('focus', {
  inserted: function (el) {
    if (el.nodeName === 'input') {
      el.focus()
    } else {
      el.getElementsByTagName('input')[0].focus()
    }
  }
})
