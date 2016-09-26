<template>
  <div id="content">
    <slot></slot>
  </div>
</template>

<style lang="scss">
#content {
  width: 70%;
  margin: -60px auto 20px auto;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
