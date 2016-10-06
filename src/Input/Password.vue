<template>
  <div class="input-password">
    <input-base type="password" :label="label" v-on:input="onInput"></input-base>
  </div>
</template>

<script>
import input from './_input.js'

export default input
</script>
