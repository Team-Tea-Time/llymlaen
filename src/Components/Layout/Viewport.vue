<template>
  <div :id="id">
    <page-header :title="title" :subtitle="subtitle" />
    <content-container>
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
