<template>
  <div id="root">
    <top-bar>
      <template v-if="auth.authenticated">
        <el-submenu index="user-links" class="right">
          <template slot="title">
            <avatar
              :url="auth.user.profile.avatar || '/static/images/user_default_avatar.jpg'"
              size="small"
            />
            <span class="greeting">
              Hello, <strong>{{ auth.user.name }}</strong>
            </span>
          </template>
          <el-menu-item index="/admin/overview">Admin</el-menu-item>
          <el-menu-item :index="`/@${auth.user.url_encoded_name}`">Profile</el-menu-item>
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
import Avatar from 'src/Components/Avatar'

import strings from 'src/strings/user'

export default {
  components: {
    NavItem,
    TopBar,
    Avatar
  },
  store,
  computed: {
    auth () {
      return store.state.auth
    }
  },
  methods: {
    logout () {
      this.$http.post('/api/users/me/clear-token').then(response => {
        this.$router.push('/user/login')
        this.$message.success(strings.logout_succeeded)
        store.commit('clearAuth')
      })
    }
  }
}
</script>

<style lang="scss">
@import '../scss/colours';
@import '../scss/fonts';
@import '../scss/media-queries';
@import '../scss/nprogress';
@import '../scss/overrides';
@import '../scss/transitions';

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

.note {
  font-size: 0.9rem;
  color: #aaa;

  .el-button--text {
    font-size: 0.9rem;
  }
}

#root {
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

#top-bar {
  .avatar {
    margin: -3px 5px 0 0;
    vertical-align: middle;
    border-radius: 100%;
  }

  @include mq($until: tablet) {
    .greeting {
      display: none;
    }
  }
}
</style>
