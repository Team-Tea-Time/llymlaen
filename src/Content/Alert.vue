<template>
  <transition name="fade">
    <card
      :class="classList"
      zHeight="1"
      :heading="heading"
      v-if="show"
    >
      <div class="icon">
        <i class="material-icons">{{ icon }}</i>
      </div>
      <slot></slot>
    </card>
  </transition>
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
    },
    icon () {
      switch (this.type) {
        case 'error':
          return 'error_outline'
        case 'info':
          return 'info_outline'
        case 'success':
          return 'check'
        case 'warning':
          return 'warning'
      }
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    if (!this.persist) {
      setTimeout(() => (
        this.show = false
      ), 6000)
    }
  }
}
</script>

<style lang="scss">
@import '../palette';

.card.alert {
  position: relative;
  padding-left: 80px;
  font-size: 0.9rem;
  font-weight: bold;
  overflow: hidden;

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 17px;
    color: palette('white');
    text-align: center;
  }

  &.info {
    color: palette('blue', 'A200');

    .icon {
      background: palette('blue', 'A200');
    }
  }
  &.success {
    color: palette('teal', 'A700');

    .icon {
      background: palette('teal', 'A700');
    }
  }
  &.warning {
    color: palette('deep orange', 400);

    .icon {
      background: palette('deep orange', 400);
    }
  }
  &.error {
    color: palette('red', 'A200');

    .icon {
      background: palette('red', 'A200');
    }
  }
}
</style>
