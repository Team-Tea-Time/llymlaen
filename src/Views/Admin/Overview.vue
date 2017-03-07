<template>
  <admin-viewport
    id="admin-overview"
    title="Overview"
    :breadcrumbs="breadcrumbs"
    :loading="isLoading"
  >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            Users
          </div>
          <el-tag type="success">{{ users.total }} total</el-tag>
          <el-tag type="warning" v-if="users.unverified > 0">{{ users.unverified }} unverified</el-tag>
          <el-button class="full-width" type="primary" @click="$router.push('/admin/users')">Manage Users</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            Free Companies
          </div>
          <el-tag type="success">{{ freeCompanies.total }} total</el-tag>
          <el-tag type="warning" v-if="freeCompanies.unverified > 0">{{ freeCompanies.unverified }} unverified</el-tag>
          <el-button class="full-width" type="primary" @click="$router.push('/admin/free-companies')">Manage Free Companies</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            Characters
          </div>
          <el-tag type="success">{{ characters.total }} total</el-tag>
          <el-tag type="warning" v-if="characters.unverified > 0">{{ characters.unverified }} unverified</el-tag>
          <el-button class="full-width" type="primary" @click="$router.push('/admin/characters')">Manage Characters</el-button>
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
      ],
      users: {
        total: 0,
        unverified: 0
      },
      freeCompanies: {
        total: 0,
        unverified: 0
      },
      characters: {
        total: 0,
        unverified: 0
      }
    }
  },
  created () {
    this.$http.get('/api/user/totals').then(response => {
      this.users = response.data
    })
    this.$http.get('/api/character/totals').then(response => {
      this.characters = response.data
    })
  }
}
</script>

<style>
</style>
