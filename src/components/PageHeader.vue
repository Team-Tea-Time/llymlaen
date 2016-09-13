<template>
  <div id="page-header">
    <h1>
      <slot name="title">
        The Roleplayer's Guide to Eorzea
      </slot>
    </h1>
    <h2>
      <slot name="subtitle">
      </slot>
    </h2>
  </div>
</template>

<style lang="scss">
#page-header {
  height: 400px;
  background: url('../assets/header_back.jpg') no-repeat center center;
  background-size: cover;
  text-align: center;

  h1, h2 {
    position: relative;
    margin: 0;
    font-weight: 300;
    color: #fff;
    text-shadow: rgba(0, 0, 0, 0.85) 0 0 20px, rgba(0, 0, 0, 0.5) 0 0 5px;
  }

  h1 {
    top: 25%;
    font-size: 4.0rem;
  }

  h2 {
    top: 100px;
    font-size: 2.5rem;
  }
}
</style>
