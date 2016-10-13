<template>
  <div :class="classList">
    <h2 v-if="heading">{{ heading }}</h2>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['zHeight', 'class', 'heading'],
  computed: {
    classList () {
      var extra = (typeof this.class !== 'undefined') ? this.class : ''
      return `card z-height-${this.zHeight} ${extra}`
    }
  }
}
</script>

<style lang="scss">
@import '../material';
@import '../palette';

.card {
  padding: 20px;
  margin: 0 0 15px 0;
  border-radius: 3px;
  background: #ffffff;

  @for $i from 1 to 5 {
    &.z-height-#{$i} {
      @include elevate($i);
    }
  }
}
</style>
