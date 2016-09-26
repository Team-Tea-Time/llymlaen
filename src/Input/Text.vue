<template>
  <div class="input-text">
    <input-base type="text" :label="label" :value.sync="value"></input-base>
  </div>
</template>

<script>
import InputBase from './Base'

export default {
  props: ['label', 'name', 'value', 'placeholder'],
  components: {
    InputBase
  }
}
</script>
