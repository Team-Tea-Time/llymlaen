<template>
  <admin-viewport
    id="admin-overview"
    title="Overview"
    :breadcrumbs="breadcrumbs"
  >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            Users
          </div>
          <el-tag type="success">15 users</el-tag>
          <el-tag type="warning">3 unverified</el-tag>
          <el-button class="full-width" type="primary">Manage Users</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            Free Companies
          </div>
          <el-tag type="success">3 Free Companies</el-tag>
          <el-tag type="warning">0 unverified</el-tag>
          <el-button class="full-width" type="primary">Manage Free Companies</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            Characters
          </div>
          <el-tag type="success">9 Characters</el-tag>
          <el-tag type="warning">2 unverified</el-tag>
          <el-button class="full-width" type="primary">Manage Characters</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
  </admin-viewport>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        { label: 'Overview' }
      ]
    }
  }
}
</script>

<style>
</style>
