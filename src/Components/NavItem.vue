<template>
  <router-link :to="to" class="nav-item">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ['to']
}
</script>

<style lang="scss">
a.nav-item {
  display: inline-block;
  padding: 0 15px;
  font-size: 1.1rem;
  color: #fff;
  text-decoration: none;
  line-height: 65px;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>
