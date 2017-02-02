<template>
  <div class="character-row">
    <img v-if="avatar" :src="avatar" alt="" />
    <div class="details">
      <strong>{{ name }}</strong>
      <span v-if="world">
        <br>{{ world }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    world: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.character-row {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 3px;
  border: 1px solid #C0CCDA;

  img {
    display: inline-block;
    width: 64px;
    height: 64px;
    border-radius: 3px;
    vertical-align: middle;
    margin-right: 1rem;
  }

  .details {
    display: inline-block;
  }
}
</style>
