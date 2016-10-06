import InputBase from './Base'

export default {
  props: ['label', 'name', 'value', 'placeholder'],
  components: {
    InputBase
  },
  methods: {
    onInput: function (event) {
      this.$emit('input', event.target.value)
    }
  }
}
