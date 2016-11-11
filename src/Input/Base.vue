<template>
  <div class="input-wrapper" :class="{populated: value, invalid: error}">
    <textarea v-if="type == 'textarea'" :type="type" v-model="value" v-on:input="onInput"></textarea>
    <select v-if="type == 'select'" v-model="value" v-on:input="onInput">
      <slot name="options"></slot>
    </select>
    <input v-if="type != 'textarea' && type != 'select'" :type="type" v-model="value" v-on:input="onInput">
    <span class="bar"></span>
    <label>
      {{ label }}
      <span class="description">{{ description }}</span>
    </label>
    <span class="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: ['type', 'label', 'description', 'error'],
  data () {
    return {
      value: null
    }
  },
  methods: {
    onInput: function (event) {
      this.$emit('input', event)
    }
  }
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

  &.invalid {
    input, textarea {
      border-bottom: 1px solid palette('deep orange', 'A400');
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

    .description {
      font-size: 0.9rem;
      font-style: italic;
      color: #ccc;
    }
  }

  .error {
    font-size: 0.8rem;
    color: palette('deep orange', 'A400');
  }
}
</style>
