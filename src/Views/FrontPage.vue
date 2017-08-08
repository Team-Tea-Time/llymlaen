<template>
  <viewport
    id="front-page"
    :title="title"
    subtitle="Portal"
  >
    <div v-for="article in articles">
      {{ article.body }}
    </div>
  </viewport>
</template>

<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  computed: {
    title() {
      let currentWorld = this.$store.state.currentWorld
      return currentWorld && currentWorld.name != null
        ? currentWorld.name
        : 'XIV.World'
    }
  },
  created () {
    this.$startLoading()
    this.fetch()
  },
  methods: {
    fetch () {
      this.$http.get('articles').then(response => {
        this.articles = response.data.data
        this.$doneLoading()
      })
    }
  }
}
</script>
