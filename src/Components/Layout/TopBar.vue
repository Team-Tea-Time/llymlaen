<template>
  <el-menu id="top-bar" theme="dark" default-active="/" mode="horizontal" :router="true">
    <slot></slot>
    <el-submenu index="/" class="world-select">
      <template slot="title">{{ currentWorld }}</template>
      <el-menu-item index="/open/portal" class="separated">Portal</el-menu-item>
      <el-menu-item v-for="world in worlds" :index="`/open/${world}`">{{ world }}</el-menu-item>
    </el-submenu>
    <el-menu-item index="/">Home</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'top-bar',
  data () {
    return {
      currentWorld: 'Balmung',
      worlds: [
        'Adamantoise',
        'Balmung'
      ],
      showList: false
    }
  }
}
</script>

<style lang="scss">
@import '../../colours';

#top-bar {
  display: block;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  border-radius: 0;
  background: transparentize($backdrop, 0.2);
  background: linear-gradient(to right, transparentize(#21406c, 0.2), transparentize(#593556, 0.2));
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
  z-index: 1000;

  .el-submenu.right,
  .el-menu-item.right {
    float: right;
  }

  .el-submenu__title,
  .el-submenu__icon-arrow,
  > .el-submenu > .el-menu-item,
  > .el-menu-item {
    color: #fff;
  }

  .el-submenu__title,
  > .el-submenu > .el-menu-item,
  > .el-menu-item {
    border-bottom: none;

    &:hover {
      background: rgba(255, 255, 255, 0.075);
    }
  }

  .world-select {
    background: $primary;

    .el-submenu__title {
      font-family: "Catamaran", sans-serif;
      font-size: 1.3rem;
      font-weight: 300;
      text-transform: uppercase;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
