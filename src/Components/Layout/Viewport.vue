<template>
  <div :id="id">
    <page-header :title="title" :subtitle="subtitle" />
    <content-container v-loading.body="loading">
      <slot />
    </content-container>
  </div>
</template>

<script>
import ContentContainer from './Content'
import PageHeader from './PageHeader'

export default {
  name: 'viewport',
  components: {
    ContentContainer,
    PageHeader
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    }
  }
}
</script>
