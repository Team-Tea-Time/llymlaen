<template>
  <div class="character-row">
    <el-dropdown v-if="enableSettingsMenu">
      <span class="el-dropdown-link">
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-if="model.status !== 0"
          @click.native="setAsMain"
        >
          Set as main
        </el-dropdown-item>
        <el-dropdown-item
          v-if="!model.verified"
          @click.native="dialogVerifyVisible = true"
        >
          Verify
        </el-dropdown-item>
        <el-dropdown-item
          v-if="!model.profile && model.verified"
          @click.native="dialogEditVisible = true"
        >
          Create profile
        </el-dropdown-item>
        <el-dropdown-item
          v-if="model.profile"
          @click.native="viewProfile"
        >
          View profile
        </el-dropdown-item>
        <el-dropdown-item
          v-if="model.profile"
          @click.native="dialogEditVisible = true"
        >
          Edit profile
        </el-dropdown-item>
        <el-dropdown-item
          class="remove"
          @click.native="remove"
        >
          Remove
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="tags" v-if="showTags">
      <el-tooltip effect="dark" content="Your main character is displayed in various places throughout the site." placement="left">
        <el-tag v-if="model.status === 0" type="success">main</el-tag>
      </el-tooltip>
      <el-tag
        v-if="!model.verified"
        type="danger"
        @click.native="dialogVerifyVisible = true"
        class="link"
      >
        unverified
      </el-tag>
    </div>
    <img v-if="model.avatar" :src="model.avatar" class="avatar" />
    <div class="info">
      <strong>{{ model.name }}</strong>
      <div v-if="showDetails">
        <el-tag type="gray">
          {{ model.world.name }}
        </el-tag>
        <el-tag type="gray">
          {{ model.gender }}
        </el-tag>
        <el-tag type="gray">
          {{ model.race }}
        </el-tag>
        <el-tag type="gray">
          {{ model.clan }}
        </el-tag>
      </div>
    </div>
    <el-dialog
      :title="`Verify Character: ${model.name}`"
      :visible.sync="dialogVerifyVisible"
      v-if="model.verification"
    >
      <el-row v-loading="isLoading">
        <el-col :lg="{span: 16, offset: 4}">
          <p>To verify ownership of this character, log into Lodestone, edit the character's profile and enter the following:</p>

          <div class="verification-code">{{ model.verification.code }}</div>

          <p class="content-right">
            <el-button @click="openLodestoneProfile">
              Open Lodestone profile <i class="el-icon-arrow-right"></i>
            </el-button>
          <p>

          <p><em><strong>Note:</strong> You don't have to remove anything else in the profile, as long as this code is visible somewhere.</em></p>

          <div v-for="attribute in validationErrors">
            <el-alert
              v-for="error in attribute"
              type="warning"
              :closable="false"
              :title="error"
            />
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button  size="large" @click="dialogVerifyVisible = false">Cancel</el-button>
        <el-button type="primary" size="large" @click="verify" :disabled="isLoading">Verify</el-button>
      </span>
    </el-dialog>
    <edit-dialog
      :character="model"
      v-if="model.verified"
      :visible="dialogEditVisible"
      v-on:close="dialogEditVisible = false"
      v-on:save="viewProfile"
    />
  </div>
</template>

<script>
import strings from 'src/strings/character'
import EditDialog from 'src/Components/Character/Profile/Edit'

export default {
  components: {
    EditDialog
  },
  props: {
    character: {
      type: Object,
      required: true
    },
    showTags: {
      type: Boolean,
      default: false
    },
    showDetails: {
      type: Boolean,
      default: false
    },
    enableSettingsMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dialogVerifyVisible: false,
      dialogEditVisible: false,
      model: null,
      validationErrors: []
    }
  },
  created () {
    this.model = this.character
  },
  methods: {
    verify () {
      this.validationErrors = []
      this.$startLoading()

      this.$http.post(
        `characters/${this.model.id}/verify`,
        { code: this.model.verification.code }
      ).then(response => {
        this.$doneLoading()
        this.model = response.body
        this.dialogVerifyVisible = false
        this.$message.success(strings.verification_succeeded)
      }, response => {
        this.$doneLoading()
        if (response.status === 422) {
          this.validationErrors = response.data
        } else {
          this.$message.error(strings.verification_failed)
        }
      })
    },
    setAsMain () {
      this.$startLoading()

      this.$http.post(`characters/${this.model.id}/set-main`).then(response => {
        this.$doneLoading()
        this.model.status = 0
        this.$emit('main-set')
        this.$message.success(sprintf(strings.setting_main_succeeded, { name: this.model.name }))
      }, response => {
        this.$doneLoading()
        this.$message.error(strings.setting_main_failed)
      })
    },
    remove () {
      this.$prompt(strings.confirm_removal, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showInput: true,
        inputValidator: value => {
          return value === this.model.name
        },
        inputErrorMessage: strings.name_mismatch
      }).then(() => {
        this.$startLoading()

        this.$http.delete(`characters/${this.model.id}`).then(response => {
          this.$message.success(strings.removal_succeeded)
          this.$emit('removed')
          this.$doneLoading()
        }, response => {
          this.$doneLoading()
          this.$message.error(strings.removal_failed)
        })
      })
    },
    viewProfile () {
      this.dialogEditVisible = false
      this.$router.push(`/characters/${this.model.id}/${this.model.slug}`)
    },
    openLodestoneProfile () {
      let win = window.open(`http://eu.finalfantasyxiv.com/lodestone/character/${this.model.id}/`, '_blank')

      if (win) {
          win.focus()
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/colours';

.character-row {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 3px;
  border: 1px solid #C0CCDA;

  .el-dropdown {
    float: right;
    margin: 3px 0 0 10px;

    .el-dropdown-link {
      cursor: pointer;
    }
  }

  .tags {
    float: right;
  }

  .avatar {
    display: inline-block;
    width: 64px;
    height: 64px;
    margin-right: 1rem;
    border-radius: 3px;
    vertical-align: middle;
  }

  .info {
    display: inline-block;
    vertical-align: middle;
  }

  .verification-code {
    padding: 15px;
    border-radius: 3px;
    background: #f2f2f2;
    font-size: 1.4rem;
    color: #0a9466;
    text-align: center;
  }
}

.el-dropdown-menu {
  .el-dropdown-menu__item.remove {
    color: $danger;
  }
}
</style>
