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
          class="remove"
          @click.native="dialogRemoveVisible = true"
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
        class="verify"
      >
        unverified
      </el-tag>
    </div>
    <img v-if="character.avatar" :src="character.avatar" alt="" />
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

          <p><em><strong>Note:</strong> You don't have to remove anything else in the profile, as long as this code is visible somewhere. It's recommended that you keep the code in place after verifying.</em></p>

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
    <el-dialog :title="`Remove Character: ${character.name}`" v-model="dialogRemoveVisible" size="tiny">
      <el-row :loading="isLoading">
        <el-col>
          <p>Enter the character name below to confirm removal:</p>
          <el-input v-model="removalConfirmation"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRemoveVisible = false">Cancel</el-button>
        <el-button
          type="danger"
          @click="remove"
          :disabled="isLoading || removalConfirmation !== character.name"
        >
          Remove
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
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
      validationErrors: [],
      dialogRemoveVisible: false,
      removalConfirmation: null
    }
  },
  methods: {
    verify () {
      this.validationErrors = []
      this.$setLoading()

      this.$http.post(
        `/api/character/${this.character.id}/verify`,
        { code: this.character.verification.code }
      ).then(response => {
        this.dialogVerifyVisible = false
        this.$clearLoading()
        this.character.verified = true
        Message.success('Character verified!')
      }, response => {
        this.$clearLoading()
        if (response.status === 422) {
          this.validationErrors = response.data
        } else {
          Message.error('Verifying character failed. :(')
        }
      })
    },
    setAsMain () {
      this.$setLoading()

      this.$http.post(`/api/character/${this.character.id}/set-main`).then(response => {
        this.$clearLoading()
        this.character.status = 0
        this.$emit('main-set')
        Message.success(`${this.character.name} set as main.`)
      }, (response) => {
        this.$clearLoading()
        Message.error('Setting character as main failed. :(')
      })
    },
    remove () {
      this.$setLoading()

      this.$http.delete(`/api/character/${this.character.id}`).then(response => {
        this.dialogRemoveVisible = false
        this.$clearLoading()
        this.$emit('removed')
        Message.success(`${this.character.name} removed.`)
      }, response => {
        this.$clearLoading()
        Message.error('Removing character failed. :(')
      })
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

  img {
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
