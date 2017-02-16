<template>
  <hr class="separator" />
</template>

<script>
export default {
  name: 'separator'
}
</script>

<style lang="scss">
.separator {
  margin: 20px -40px;
  height: 1px;
  border: none;
  background: #dedede;
}

.el-dialog__body .separator {
  margin: 20px -20px;

  &:first-child {
    margin-top: 0;
  }
}
</style>
