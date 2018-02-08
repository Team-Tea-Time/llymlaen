<template>
  <div>
    <el-menu id="top-bar" theme="light" default-active="/" mode="horizontal" :router="true">
      <slot></slot>
      <li @click="openWorldSelection" class="el-menu-item world-select">
        {{ currentWorldName }}
      </li>
      <el-menu-item v-for="item in navItems" :index="item.index" class="main-navigation">{{ item.label }}</el-menu-item>
      <el-submenu index="mobile-navigation" class="mobile-navigation">
        <template slot="title">&#9776;</template>
        <li @click="openWorldSelection" class="el-menu-item mobile-world-select">
          {{ currentWorldName }}
        </li>
        <el-menu-item v-for="item in navItems" :index="item.index">{{ item.label }}</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-dialog id="world-selection" title="World Selection" v-model="dialogWorldSelectionVisible">
      <div v-if="$store.state.currentWorld">
        <el-button @click="goToPortal">
          Go to the xiv.world portal <i class="el-icon-arrow-right"></i>
        </el-button>
        <separator />
      </div>
      <el-row :gutter="10">
        <el-select v-model="selectedDC" value-key="id" placeholder="Select your DC">
          <el-option
            v-for="dc in dataCentres"
            :key="dc.id"
            :label="dc.name"
            :value="dc">
          </el-option>
        </el-select>
        <div v-if="selectedDC">
          <h3>{{ selectedDC.name }} Worlds</h3>
          <el-menu>
            <el-menu-item v-for="world in selectedDC.worlds" :index="world.name" @click="selectWorld(world)">
              {{ world.name }}
            </el-menu-item>
          </el-menu>
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  data () {
    return {
      dialogWorldSelectionVisible: false,
      dataCentres: null,
      currentDC: null,
      selectedDC: null,
      navItems: [
        { index: '/', label: 'Home' },
        { index: '/notice-board', label: 'Notice Board' }
      ]
    }
  },
  computed: {
    currentWorldName () {
      return this.$store.state.currentWorld
        ? this.$store.state.currentWorld.name
        : 'xiv.world'
    }
  },
  created () {
    this.$http.get('data-centres').then(response => {
      this.dataCentres = response.body

      let currentDC = response.body.filter(dc => {
        return dc.worlds.filter(w => {
          return w.name === this.currentWorldName
        }).length > 0
      })

      if (currentDC.length) {
        this.currentDC = currentDC[0]
        this.selectedDC = currentDC[0]
      }
    })
  },
  methods: {
    openWorldSelection () {
      this.dialogWorldSelectionVisible = true
    },
    goToPortal () {
      window.location.href = window.location.href.replace(
        `${this.$store.state.currentWorld.name_lowercase}.`,
        ''
      )
    },
    selectWorld (world) {
      let url = window.location.href
      let destination = null
      if (this.$store.state.currentWorld) {
        // On a world already, so let's redirect based on the current URL
        destination = url.replace(
          this.$store.state.currentWorld.name_lowercase,
          world.name_lowercase
        )
      } else {
        destination = url.replace('://', `://${world.name_lowercase}.`)
      }
      window.location.href = destination
    }
  }
}
</script>

<style lang="scss">
@import '~src/themes/default/colours';
@import '~src/themes/default/media-queries';

#top-bar {
  display: block;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  border-radius: 0;
  border: none;
  background: transparentize($backdrop, 0.2);
  background: linear-gradient(to right, transparentize(#21406c, 0.2), transparentize(#593556, 0.2));
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
  z-index: 1000;

  .el-submenu.right,
  .el-menu-item.right {
    float: right;
  }

  > .el-menu-item {
    color: #fff;

    &:hover, &.is-active:hover {
      background: rgba(#fff, 0.075);
    }

    &.is-active {
      background: rgba(#fff, 0.05);
    }
  }

  > .el-submenu {
    > .el-submenu__title,
    > .el-submenu__title > .el-submenu__icon-arrow {
      color: #fff;
    }

    > .el-submenu__title:hover {
      background: rgba(255, 255, 255, 0.075);
    }

    .el-submenu {
      float: none;

      .el-submenu__title {
        height: auto;
        padding: 0 10px;
        line-height: 36px;
      }

      .el-menu {
        top: 36px;
        left: 20px;
      }
    }
  }

  .el-submenu__title,
  .el-menu-item {
    &:not(.separated) {
      border-bottom: none;
    }
  }

  .world-select {
    background: $primary;
    font-family: "Catamaran", sans-serif;
    font-size: 1.4rem;
    font-weight: 300;
    text-transform: uppercase;

    &:hover {
      background: lighten($primary, 5%);
    }
  }

  .mobile-navigation {
    > .el-submenu__title {
      font-size: 1.4rem;

      i.el-icon-caret-bottom {
        display: none;
      }
    }
  }

  @include mq($until: tablet) {
    .world-select {
      display: none;
    }

    .main-navigation {
      display: none;
    }
  }

  @include mq($from: tablet) {
    .mobile-navigation {
      display: none;
    }
  }
}

#world-selection {
  .el-col {
    margin: 0 0 20px 0;
  }

  .el-select {
    margin-bottom: 1rem;
  }
}
@media only screen and (max-width:48em) {
	#world-selection .el-dialog--small {
	  width: 90%;
	}
}
</style>
