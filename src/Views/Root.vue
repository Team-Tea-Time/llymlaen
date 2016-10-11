<template>
  <div id="root">
    <top-bar>
      <div class="right">
        <nav-item to="/user/register">
          Register
        </nav-item>
        <nav-item to="/user/login">
          Log in
        </nav-item>
      </div>
    </top-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import debounce from 'debounce'

import TopBar from '../Layout/TopBar'
import NavItem from '../Navigation/NavItem'

export default {
  components: {
    NavItem,
    TopBar
  },
  ready () {
    var topBarClass = document.getElementById('top-bar').classList

    topBarClass.add('at-top')

    window.onscroll = debounce((event) => {
      if (document.body.scrollTop === 0) {
        topBarClass.add('at-top')
      } else {
        topBarClass.remove('at-top')
      }
    }, 35)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400');

@import '../palette';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 12pt;
}

body {
  background: $greylightest;
}

.right {
  float: right;
}

#root {
  min-height: 1600px;
  color: $bluegrey;
  font-family: "Open Sans", Arial, Verdana, sans-serif;

  a:not(.nav-item) {
    color: #42b983;
    text-decoration: none;
  }

  h1, h2, h3, h4 {
    font-family: "Open Sans Condensed", sans-serif;
    font-weight: 300;
  }
}

/* NProgress */

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1031;
  width: 100%;
  height: 2px;
  background: $red;
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px $red, 0 0 5px $red;
  opacity: 1.0;
  transform: rotate(3deg) translate(0px, -4px);
}
</style>
