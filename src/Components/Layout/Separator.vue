<template>
  <hr :class="classes" />
</template>

<script>
export default {
  name: 'separator',
  props: {
    offset: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes () {
      return {
        separator: true,
        offset: this.offset
      }
    }
  }
}
</script>

<style lang="scss">
.separator {
  margin: 20px 0;
  height: 1px;
  border: none;
  background: #dedede;

  &.offset {
    margin: 20px -40px;
  }
}

.el-dialog__body .separator {
  margin: 20px -20px;

  &:first-child {
    margin-top: 0;
  }
}
</style>
