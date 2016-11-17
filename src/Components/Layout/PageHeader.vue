<template>
  <div id="page-header">
    <h1>{{ title }}</h1>
    <h2 v-if="subtitle">{{ subtitle }}</h2>
  </div>
</template>

<script>
export default {
  name: 'page-header',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: String
  }
}
</script>

<style lang="scss">
#page-header {
  height: 400px;
  background: url('../../assets/header_back.jpg') no-repeat center center;
  background-size: cover;
  text-align: center;

  h1, h2 {
    position: relative;
    margin: 0;
    font-weight: 300;
    color: #fff;
    text-shadow: #000 0 0 30px;
  }

  h1 {
    top: 30%;
    font-size: 4.5rem;
    font-weight: 300;
    text-transform: uppercase;
  }

  h2 {
    top: 130px;
    font-size: 2.2rem;
  }
}
</style>
