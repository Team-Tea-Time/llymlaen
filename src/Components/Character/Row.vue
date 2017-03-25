<template>
  <div class="character-row">
    <el-dropdown v-if="enableSettingsMenu">
      <span class="el-dropdown-link">
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-if="character.status !== 0"
          @click.native="setAsMain"
        >
          Set as main
        </el-dropdown-item>
        <el-dropdown-item
          v-if="!character.verified"
          @click.native="dialogVerifyVisible = true"
        >
          Verify
        </el-dropdown-item>
        <el-dropdown-item
          v-if="!character.profile && character.verified"
          @click.native="dialogEditVisible = true"
        >
          Create profile
        </el-dropdown-item>
        <el-dropdown-item
          v-if="character.profile"
          @click.native="viewProfile"
        >
          View profile
        </el-dropdown-item>
        <el-dropdown-item
          v-if="character.profile"
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
        <el-tag v-if="character.status === 0" type="success">main</el-tag>
      </el-tooltip>
      <el-tag
        v-if="!character.verified"
        type="danger"
      >
        unverified
      </el-tag>
    </div>
    <img v-if="character.avatar" :src="character.avatar" class="avatar" />
    <div class="info">
      <strong>{{ character.name }}</strong>
      <div v-if="showDetails">
        <el-tag type="gray">
          {{ character.world.name }}
        </el-tag>
        <el-tag type="gray">
          {{ character.gender }}
        </el-tag>
        <el-tag type="gray">
          {{ character.race }}
        </el-tag>
        <el-tag type="gray">
          {{ character.clan }}
        </el-tag>
      </div>
    </div>
    <el-dialog
      :title="`Verify Character: ${character.name}`"
      v-model="dialogVerifyVisible"
      v-if="character.verification"
    >
      <el-row v-loading="isLoading">
        <el-col :lg="{span: 16, offset: 4}">
          <p>To verify ownership of this character, log into Lodestone, edit the character's profile and enter the following:</p>

          <div class="verification-code">{{ character.verification.code }}</div>

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
      :character="character"
      v-if="character.profile || character.verified"
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
      validationErrors: []
    }
  },
  methods: {
    verify () {
      this.validationErrors = []
      this.$setLoading()

      this.$http.post(
        `/api/characters/${this.character.id}/verify`,
        { code: this.character.verification.code }
      ).then(response => {
        this.dialogVerifyVisible = false
        this.$clearLoading()
        this.character.verified = true
        this.$message.success(strings.verification_succeeded)
      }, response => {
        this.$clearLoading()
        if (response.status === 422) {
          this.validationErrors = response.data
        } else {
          this.$message.error(strings.verification_failed)
        }
      })
    },
    setAsMain () {
      this.$setLoading()

      this.$http.post(`/api/characters/${this.character.id}/set-main`).then(response => {
        this.$clearLoading()
        this.character.status = 0
        this.$emit('main-set')
        this.$message.success(sprintf(strings.setting_main_succeeded, { name: this.character.name }))
      }, response => {
        this.$clearLoading()
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
          return value === this.character.name
        },
        inputErrorMessage: strings.name_mismatch
      }).then(() => {
        this.$setLoading()

        this.$http.delete(`/api/characters/${this.character.id}`).then(response => {
          this.$message.success(strings.removal_succeeded)
          this.$emit('removed')
          this.$clearLoading()
        }, response => {
          this.$clearLoading()
          this.$message.error(strings.removal_failed)
        })
      })
    },
    viewProfile () {
      this.dialogEditVisible = false
      this.$router.push(`/characters/${this.character.id}/${this.character.slug}`)
    }
  }
}
</script>

<style lang="scss">
@import '../../colours';

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
