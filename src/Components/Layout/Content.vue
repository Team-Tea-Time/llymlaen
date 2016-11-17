<template>
  <div id="content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'content-container'
}
</script>

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

@media only screen and (max-width:48em) {
	#content {
	  width: 90%;
	}
}
</style>
