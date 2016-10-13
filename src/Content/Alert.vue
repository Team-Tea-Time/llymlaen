<template>
  <card
    :class="classList"
    zHeight="1"
    :heading="heading"
    v-if="show"
    transition="fade"
  >
    <slot></slot>
  </card>
</template>

<script>
import Card from './Card'

export default {
  props: ['type', 'heading', 'persist'],
  components: {
    Card
  },
  computed: {
    classList () {
      var type = (typeof this.type !== 'undefined') ? this.type : 'info'
      return `alert ${type}`
    }
  },
  data () {
    return {
      show: true
    }
  },
  mounted () {
    if (!this.persist) {
      setTimeout(function () {
        this.show = false
      }, 4000)
    }
  }
}
</script>

<style lang="scss">
@import '../palette';

.card.alert {
  position: relative;
  padding-left: 40px;
  background: $bluegrey;
  color: palette('white');
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 8px;
    bottom: 8px;
    width: 6px;
    border-radius: 3px;
  }

  &.info::before {
    background: palette('blue');
    box-shadow: 0 0 15px 0 palette('blue');
  }
  &.success::before {
    background: palette('teal', 'A400');
    box-shadow: 0 0 15px 0 palette('teal', 'A400');
  }
  &.warning::before {
    background: palette('deep orange');
    box-shadow: 0 0 15px 0 palette('deep orange');
  }
  &.error::before {
    background: palette('red', 'A400');
    box-shadow: 0 0 15px 0 palette('red', 'A400');
  }
}
</style>
