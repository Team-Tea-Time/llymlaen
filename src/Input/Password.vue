<template>
  <div class="input-password">
    <input-base type="password" :label="label" :value.sync="value"></input-base>
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
