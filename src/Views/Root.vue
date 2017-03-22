<template>
  <div id="root">
    <top-bar>
      <template v-if="auth.authenticated">
        <el-submenu index="test" class="right">
          <template slot="title">Hello, <strong>{{ auth.user.name }}</strong></template>
          <el-menu-item index="/admin/overview">Admin</el-menu-item>
          <el-menu-item index="/user/profile">Profile</el-menu-item>
          <el-menu-item index="/user/settings">Settings</el-menu-item>
          <el-menu-item index="/user/characters">Characters</el-menu-item>
          <li class="el-menu-item" @click="logout">Log out</li>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item index="/user/register" class="right">Register</el-menu-item>
        <el-menu-item index="/user/login" class="right">Log in</el-menu-item>
      </template>
    </top-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import debounce from 'debounce'

import store from 'src/store'

import TopBar from 'src/Components/Layout/TopBar'
import NavItem from 'src/Components/NavItem'

import strings from 'src/strings/user'

export default {
  components: {
    NavItem,
    TopBar
  },
  store,
  computed: {
    auth () {
      return store.state.auth
    }
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
  },
  methods: {
    logout () {
      this.$http.post('/api/user/clear-token').then(response => {
        store.commit('clearAuth')
        this.$message.success(strings.logout_succeeded)
        this.$router.push('/user/login')
      })
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,700|Open+Sans:400,600');

@import '../colours';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Open Sans", Arial, Verdana, sans-serif;
  font-size: 11pt;
}

body {
  background: #e5e9eb;
}

.right {
  float: right;
}

.content-centre {
  text-align: center;
}

.content-right {
  text-align: right;
}

#root {
  min-height: 1000px;
  color: $backdrop;

  a:not(.nav-item) {
    color: $link-color;
    text-decoration: none;
  }

  h3 {
    font-size: 1.8rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h1, h2, h3, h4 {
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 300;

    &:first-child {
      margin-top: 0;
    }
  }
}

// Transitions

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

// ElementUI

.el-loading-mask {
  background: rgba(255, 255, 255, 0.75);
  z-index: 999;
}

.el-select {
  width: 100%;
}

.el-message-box__input {
  margin: 0 10px 0 50px;
}

.el-button.full-width {
  display: block;
  width: 100%;
}

.el-card .el-card__body {
  .el-button {
    margin-top: 20px;
  }
}

.el-menu-item {
  &.separated {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
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
  height: 3px;
  background: #fff;
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #fff, 0 0 5px #fff;
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
