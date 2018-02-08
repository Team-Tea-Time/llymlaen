<template>
  <div id="admin">
    <el-menu class="side-menu" :default-active="$route.path" :router="true">
      <el-menu-item index="/admin/overview">Overview</el-menu-item>
      <el-menu-item index="/admin/users">Users</el-menu-item>
      <el-menu-item index="/admin/articles">Articles</el-menu-item>
      <el-menu-item index="/admin/characters">Characters</el-menu-item>
      <el-menu-item index="/admin/free-companies">Free Companies</el-menu-item>
      <el-menu-item index="/admin/listings">Listings</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '../themes/default/colours';

#admin {
  .side-menu {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 200px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    z-index: 999;
  }

  .cell {
    .status {
      font-weight: bold;

      &.verified, &.active {
        color: $success;
      }
      &.unverified, &.inactive {
        color: $danger;
      }
    }
  }
}
</style>
