<template>
  <div id="content">
    <alert v-for="alert in this.$store.state.alerts" :type="alert.type" :persist="alert.persist">
      {{ alert.message }}
    </alert>
    <slot></slot>
  </div>
</template>

<script>
import Alert from '../Content/Alert'

export default {
  components: {
    Alert
  }
}
</script>

<style lang="scss">
#content {
  width: 70%;
  margin: -60px auto 20px auto;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
