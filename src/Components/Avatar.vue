<template>
  <img
    :src="url"
    :style="`max-width: ${maxWidth}px`"
    :class="classes"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    size: {
      type: String,
      validator (size) {
        return ['standard', 'small'].includes(size)
      },
      default: 'standard'
    },
    withBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maxWidth () {
      switch (this.size) {
        case 'standard':
          return 96
          break
        case 'small':
          return 24
          break
      }
    },
    classes () {
      return {
        avatar: true,
        bordered: this.withBorder
      }
    }
  }
}
</script>

<style lang="scss">
.avatar {
  border-radius: 100%;

  &.bordered {
    border: 5px solid rgba(#3c4552, 0.2);
  }
}
</style>
