<template>
  <admin-viewport
    id="admin-listings"
    title="Listings"
    :breadcrumbs="breadcrumbs"
  >
  </admin-viewport>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        { label: 'Listings' }
      ]
    }
  }
}
</script>

<style>
</style>
