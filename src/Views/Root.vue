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

import store from '../store'

import TopBar from '../Components/Layout/TopBar'
import NavItem from '../Components/NavItem'

export default {
  components: {
    NavItem,
    TopBar
  },
  store,
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
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,700|Open+Sans:400');

@import '../colours';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Open Sans", Arial, Verdana, sans-serif;
  font-size: 12pt;
}

body {
  background: #e5e9eb;
}

.right {
  float: right;
}

.content-right {
  text-align: right;
}

#root {
  min-height: 1600px;
  color: --color-backdrop;

  a:not(.nav-item) {
    color: #42b983;
    text-decoration: none;
  }

  h1, h2, h3, h4 {
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 300;
  }
}

// Transitions

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

// NProgress

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
  background: --color-primary;
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px --color-primary, 0 0 5px --color-primary;
  opacity: 1.0;
  transform: rotate(3deg) translate(0px, -4px);
}

// Fonts

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'),
  local('MaterialIcons-Regular'),
  url('/static/MaterialIcons-Regular.woff2') format('woff2'),
  url('/static/MaterialIcons-Regular.woff') format('woff'),
  url('/static/MaterialIcons-Regular.ttf') format('truetype');
}

.material-icons {
  direction: ltr;
  display: inline-block;
  font-family: 'Material Icons';
  font-feature-settings: 'liga'; // Support for IE.
  font-size: 24px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-height: 1;
  text-rendering: optimizeLegibility; // Support for Safari and Chrome.
  text-transform: none;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: normal;
}
</style>
