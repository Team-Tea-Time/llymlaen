<template>
  <div id="top-bar">
    <div class="world-select">
      <div class="current" @click="showList = !showList">
        <span>{{ currentWorld }}</span>.eorzea.info
      </div>

      <ul v-if="showList">
        <li v-for="world in worlds" @click="currentWorld = world">{{ world }}</li>
      </ul>
    </div>
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  data () {
    return {
      currentWorld: 'Balmung',
      worlds: [
        'Adamantoise',
        'Balmung'
      ],
      showList: false
    }
  }
}
</script>

<style lang="scss">
@import '../../colours';

#top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 65px;
  background: transparentize($backdrop, 0.2);
  overflow: visible;
  transition: background 0.2s ease-out;
  z-index: 1000;

  &.at-top {
    background: none;

    .world-select {
      background: none;

      .current {
        color: #fff;
        transition: color 0.2s ease-out;
      }
    }
  }

  .world-select {
    display: inline-block;
    background: $primary;
    font-family: "Catamaran", sans-serif;
    transition: background 0.2s ease-out;

    .current {
      height: 31px;
      padding: 17px 15px;
      font-weight: 300;
      font-size: 1.7rem;
      color: lighten($primary, 25%);
      line-height: 1.3;

      &:hover {
        background: lighten($primary, 3%);
        cursor: pointer;
      }

      span {
        color: #fff;
        text-transform: lowercase;
      }
    }

    ul {
      list-type: none;
      margin: 0;
      padding: 0;
      border-top: 1px solid transparentize(#fff, 0.85);
      font-size: 1.1rem;
      color: #fff;

      li {
        display: block;
        padding: 8px 15px;

        &:hover {
          background: transparentize(#fff, 0.85);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
