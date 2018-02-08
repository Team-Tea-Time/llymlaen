<template>
  <div id="page-header" :class="classes">
    <h1>{{ title }}</h1>
    <h2 v-if="subtitle">{{ subtitle }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    }
  },
  computed: {
    classes () {
      return {
        'has-subtitle': !!this.subtitle
      }
    }
  }
}
</script>

<style lang="scss">
@import '~src/themes/default/media-queries';

#page-header {
  height: 400px;
  background: url('/static/images/header_back.jpg') no-repeat center center;
  background-size: cover;
  text-align: center;

  h1, h2 {
    position: relative;
    margin: 0;
    font-weight: 300;
    color: #fff;
    text-shadow: rgba(0, 0, 0, 0.65) 0 0 6px;
  }

  h1 {
    top: 40%;
    font-size: 4.6rem;
    font-weight: 300;
    text-transform: uppercase;
  }

  h2 {
    top: 135px;
    font-size: 2rem;
  }

  &.has-subtitle {
    h1 {
      top: 33%;
    }
  }

  @include mq($until: tablet) {
    height: 300px;

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      top: 110px;
      font-size: 1.4rem;
    }

    &.has-subtitle {
      height: 300px;

      h1 {
        top: 35%;
      }
    }
  }
}
</style>
