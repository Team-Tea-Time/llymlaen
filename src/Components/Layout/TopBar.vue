<template>
  <div>
    <el-menu id="top-bar" theme="light" default-active="/" mode="horizontal" :router="true">
      <slot></slot>
      <el-submenu index="/" class="world-select">
        <template slot="title">{{ currentWorld }}</template>
        <el-menu-item index="/open/portal" class="separated">Portal</el-menu-item>
        <el-menu-item v-for="world in worlds" :index="`/open/${world}`">{{ world }}</el-menu-item>
      </el-submenu>
      <el-menu-item v-for="item in navItems" :index="item.index" class="main-navigation">{{ item.label }}</el-menu-item>
      <el-submenu index="mobile-navigation" class="mobile-navigation">
        <template slot="title">&#9776;</template>
        <el-submenu index="mobile-world-select" class="mobile-world-select" mode="vertical">
          <template slot="title"><strong>{{ currentWorld }}</strong></template>
          <el-menu-item index="/open/portal" class="separated-top">Portal</el-menu-item>
          <el-menu-item v-for="world in worlds" :index="`/open/${world}`">{{ world }}</el-menu-item>
        </el-submenu>
        <el-menu-item v-for="item in navItems" :index="item.index">{{ item.label }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  data () {
    return {
      dialogWorldSelectionVisible: false,
      currentWorld: 'Balmung',
      worlds: [
        'Adamantoise',
        'Balmung'
      ],
      navItems: [
        { index: '/', label: 'Home' }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/colours';
@import '../../scss/media-queries';

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

  > .el-menu-item {
    color: #fff;

    &:hover {
      background: rgba(255, 255, 255, 0.075);
    }
  }

  > .el-submenu {
    > .el-submenu__title,
    > .el-submenu__title > .el-submenu__icon-arrow {
      color: #fff;
    }

    > .el-submenu__title:hover {
      background: rgba(255, 255, 255, 0.075);
    }

    .el-submenu {
      float: none;

      .el-submenu__title {
        height: auto;
        padding: 0 10px;
        line-height: 36px;
      }

      .el-menu {
        top: 36px;
        left: 20px;
      }
    }
  }

  .el-submenu__title,
  .el-menu-item {
    &:not(.separated) {
      border-bottom: none;
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

  .mobile-navigation {
    > .el-submenu__title {
      font-size: 1.4rem;

      i.el-icon-caret-bottom {
        display: none;
      }
    }
  }

  @include mq($until: tablet) {
    .world-select {
      display: none;
    }

    .main-navigation {
      display: none;
    }
  }

  @include mq($from: tablet) {
    .mobile-navigation {
      display: none;
    }
  }
}
</style>
