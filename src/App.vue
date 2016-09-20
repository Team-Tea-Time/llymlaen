<template>
  <div id="app">
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
    <page-header>
      <slot slot="subtitle">
        Balmung Edition
      </slot>
    </page-header>
    <router-view></router-view>
  </div>
</template>

<script>
import debounce from 'debounce'

import NavItem from './components/NavItem'
import PageHeader from './components/PageHeader'
import TopBar from './components/TopBar'

export default {
  components: {
    NavItem,
    PageHeader,
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
@import url('https://fonts.googleapis.com/css?family=Catamaran:300,600');

@import 'palette';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 12pt;
}

.right {
  float: right;
}

#app {
  min-height: 1600px;
  color: $bluegrey;
  font-family: "Lucida Grande", "Lucida Sans Unicode", Arial, Verdana, sans-serif;

  a:not(.nav-item) {
    color: #42b983;
    text-decoration: none;
  }

  h1, h2, h3, h4 {
    font-family: "Catamaran", sans-serif;
    font-weight: 600;
  }
}
</style>
