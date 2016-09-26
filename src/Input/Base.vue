<template>
  <div class="input-wrapper" :class="{populated: value}">
    <input v-if="type != 'textarea'" :type="type" :value="value" v-model.sync="value">
    <textarea v-else :type="type" :value="value" v-model.sync="value"></textarea>
    <span class="bar"></span>
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: ['type', 'label', 'value']
}
</script>

<style lang="scss">
@import '../palette';

.input-wrapper {
  position: relative;
  margin-bottom: 45px;

  &.populated {
    input, textarea {
      &~ label {
        top: -20px;
        font-size: 0.8rem;
        color: $red;
      }

      &~ .bar {
        &:before, &:after {
          width: 50%;
        }
      }
    }
  }

  input, textarea {
    display: block;
    position: relative;
    padding: 10px 0;
    width: 100%;
    border-sizing: border-box;
    border: none;
    border-bottom: 1px solid $greylightest;
    font-size: 1.0rem;
    color: $bluegrey;

    &:focus {
      outline: none;

      &~ label {
        top: -20px;
        font-size: 0.8rem;
        color: $red;
      }

      &~ .bar {
        &:before, &:after {
          width: 50%;
        }
      }
    }
  }

  .bar {
    display: block;
    position: relative;
    width: 100%;

    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2px;
      width: 0;
      bottom: 0;
      background: $red;
      transition: all 0.2s ease;
    }

    &:before {
      left: 50%;
    }

    &:after {
      right: 50%;
    }
  }

  label {
    position: absolute;
    left: 0;
    top: 10px;
    font-size: 1.0rem;
    font-weight: normal;
    color: #999;
    pointer-events: none;
    transition: all 0.2s ease;
  }
}
</style>
