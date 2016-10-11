<template>
  <div class="input-text">
    <input-base type="text" :label="label" v-on:input="onInput"></input-base>
  </div>
</template>

<script>
import InputBase from './Base'

export default {
  props: ['label'],
  components: {
    InputBase
  },
  methods: {
    onInput: function (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
