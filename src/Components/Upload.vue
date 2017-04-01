<template >
  <span class="upload">
    <label for="file">
      <i class="el-icon-upload" /> Select file
    </label>
    <input id="file" type="file" ref="file" :accept="accept" v-on:change="select" :multiple="multiple" />
    <span class="selection" v-if="selection">
      <span v-if="multiple">
        <template v-for="item in selection">
          {{ item.name }}<br>
        </template>
      </span>
      <span v-else>
        {{ selection.name }}
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: 'image/jpg,image/jpeg,image/png'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selection: null
    }
  },
  methods: {
    select (event) {
      this.selection = this.multiple ? event.target.files : event.target.files[0]
      this.$emit('selection', this.selection)
    }
  }
}
</script>

<style lang="scss">
@import '../scss/colours';

.upload {
  display: inline-block;

  label {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid rgb(217, 191, 191);
    color: rgb(61, 31, 31);
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0 5px 0 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;

    &:hover {
      color: $primary;
      border-color: $primary;
    }
  }

  input {
    display: none;
  }
}
</style>
