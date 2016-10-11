<template>
    <button v-on:click="click">
        <slot></slot>
        <span class="rippleJS"></span>
    </button>
</template>

<script>
import Ripple from 'vanilla-ripplejs'

export default {
  props: ['click'],
  components: {
    Ripple
  }
}
</script>

<style lang="scss">
@import '../palette';

button {
  display: inline-block;
  position: relative;
  padding: 15px 30px;
  margin: 0;
  outline: none;
  border: none;
  border-radius: 3px;
  background: $red;
  font-size: 1.0rem;
  color: #fff;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: lighten($red, 5%);
  }
}
</style>
