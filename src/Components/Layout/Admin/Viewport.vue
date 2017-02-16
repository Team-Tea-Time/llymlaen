<template>
  <div class="admin-viewport">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Admin</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :to="item.path ? { path: item.path } : null"
      >
        {{ item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header">
      <h1>{{ title }}</h1>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin-viewport',
  props: {
    title: {
      type: String,
      required: true
    },
    breadcrumbs: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
}

.admin-viewport {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 200px;
  background: #fff;

  .el-breadcrumb {
    padding: 20px;
    border-bottom: 1px solid #dedede;
  }

  .header {
    padding: 20px;
    border-bottom: 1px solid #dedede;

    h1 {
      margin: 0;
      font-size: 1.6rem;
      text-transform: uppercase;
    }
  }

  .content {
    display: flex;
    flex-flow: column;
    position: absolute;
    top: 125px;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
