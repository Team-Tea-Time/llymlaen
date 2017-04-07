<template>
  <viewport
    id="character-profile"
    :title="character.name"
    subtitle="Character Profile"
    :loading="isLoading"
  >
    <avatar
      v-if="!isLoading"
      :url="character.avatar"
      :with-border="true"
    />
    <br>
    <el-row :gutter="20">
      <el-col :md="{span: 16}">
        <div class="body" v-html="bodyParsed">
        </div>
      </el-col>
      <el-col :md="{span: 8}">
        <div class="edit" v-if="canEdit">
          <el-button @click="dialogEditVisible = true" icon="edit" class="full-width">Edit Profile</el-button>
          <edit-dialog
            :character="character"
            v-if="character.profile.id"
            :visible="dialogEditVisible"
            v-on:close="dialogEditVisible = false"
            v-on:save="saved"
          />
        </div>
        <div class="portrait">
          <div class="inner">
            <img v-if="character.profile.portrait" :src="character.profile.portrait" />
            <img v-else :src="character.portrait" />
            <i class="el-icon-search" @click="dialogPortraitVisible = true" />
          </div>
        </div>
        <el-card>
          <div slot="header" class="clearfix">
            {{ character.race }} ({{ character.clan }})
          </div>
          <p><strong>Played by:</strong> {{ character.user_name }}</p>
          <p><strong>Nameday:</strong> {{ character.nameday }}</p>
          <p><strong>Guardian:</strong> {{ character.guardian }}</p>
          <p><strong>City State:</strong> {{ character.city_state }}</p>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogPortraitVisible" class="portrait-large" size="large">
      <img v-if="character.profile.portrait" :src="character.profile.portrait" />
      <img v-else :src="character.portrait" />
    </el-dialog>
  </viewport>
</template>

<script>
import marked from 'marked'

import { userHasRole } from 'src/auth'
import EditDialog from 'src/Components/Character/Profile/Edit'
import Avatar from 'src/Components/Avatar'

export default {
  components: {
    EditDialog,
    Avatar
  },
  data () {
    return {
      dialogEditVisible: false,
      dialogPortraitVisible: false,
      character: {
        name: 'Loading...',
        profile: {
          body: null,
          bodyParsed: null
        }
      }
    }
  },
  computed: {
    canEdit () {
      let user = this.$store.state.auth.user
      return user.id === this.character.user_id || userHasRole(user, 'XIV World Staff')
    },
    bodyParsed () {
      if (this.character.profile.body) {
        return marked(this.character.profile.body)
      }

      return null
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.$setLoading()
      this.$http.get(`characters/${this.$route.params.id}`).then(response => {
        this.character = response.body
        this.$clearLoading()
      })
    },
    saved (profile) {
      this.dialogEditVisible = false
      this.character.profile = profile
    }
  }
}
</script>

<style lang="scss">
#character-profile {
  .avatar {
    position: absolute;
    left: 50%;
    top: -53px;
    margin-left: -53px;
  }

  .edit {
    padding-bottom: 5px;
  }

  .portrait {
    text-align: center;

    .inner {
      display: inline-block;
      position: relative;

      img {
        max-width: 100%;
        border-radius: 5px;
      }

      i {
        position: absolute;
        bottom: 20px;
        right: 20px;
        color: #fff;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        opacity: 0.8;

        &:hover {
          cursor: pointer;
          opacity: 1.0;
        }
      }
    }
  }

  .portrait-large {
    text-align: center;

    img {
      max-width: 100%;
    }
  }

  .el-card {
    margin-bottom: 20px;
    text-align: center;

    .el-card__header {
      font-weight: bold;
    }

    p {
      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
