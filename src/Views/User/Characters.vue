<template>
  <viewport
    id="user-characters"
    title="Your Characters"
    subtitle="Looking sharp, kupo!"
  >
    <el-dialog title="Add Character" size="large" :visible.sync="dialogVisible">
      <el-row v-loading="adding">
        <el-col :lg="{span: 12, offset: 6}">
          <el-form>
            <el-form-item label="World">
              <el-select v-model="selectedWorldId" filterable>
                <el-option
                  v-for="world in worlds"
                  :label="world.name"
                  :value="world.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Character name">
              <el-select
                v-model="newCharacter"
                filterable
                remote
                placeholder="Search Lodestone..."
                loading-text="Searching..."
                :remote-method="search"
                :loading="searching">
                <el-option
                  v-for="character in searchResults"
                  :key="character.id"
                  :label="character.name"
                  :value="character">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div v-if="newCharacter">
            <p>You've selected:</p>
            <character-row
              :character="newCharacter"
              :enableSettingsMenu="false"
            />
          </div>
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
        <el-button size="large" @click="dialogVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="large"
          @click="add"
          :disabled="!newCharacter || adding"
        >
          Add
        </el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col :lg="{span: 12, offset: 6}" v-loading.body="isLoading">
        <character-row
           v-for="character in characters"
          :character.sync="character"
          :showTags="true"
          :showDetails="true"
          v-on:main-set="setMain(character)"
          v-on:removed="removeCharacter(character)"
        />
        <el-button
          type="primary"
          size="large"
          class="full-width"
          @click="dialogVisible = true"
        >
          Add Character
        </el-button>
      </el-col>
    </el-row>
  </viewport>
</template>

<script>
import debounce from 'debounce'
import { Message } from 'element-ui'

import CharacterRow from 'src/Components/Character/Row'

import strings from 'src/strings/character'

export default {
  components: {
    CharacterRow
  },
  data () {
    return {
      characters: [],
      dialogVisible: false,
      newCharacter: null,
      adding: false,
      validationErrors: [],
      searching: false,
      searchResults: [],
      worlds: this.$store.state.worlds,
      selectedWorldId: this.$store.state.currentWorld.id
    }
  },
  created () {
    this.$startLoading()
    this.fetch()

    this.search = debounce(this.search, 400)
  },
  watch: {
    newCharacter () {
      this.validationErrors = []
    }
  },
  methods: {
    fetch () {
      this.$http.get(`users/${this.$store.state.auth.user.id}/characters`).then(response => {
        this.characters = response.data
        this.$doneLoading()
      })
    },
    search (name) {
      if (name !== '') {
        this.searching = true
        this.$http.post('lodestone/characters/search', {
          world_id: this.selectedWorldId,
          name
        }).then(response => {
          this.searchResults = response.body
          this.searching = false
        })
      }
    },
    add () {
      this.validationErrors = []
      this.adding = true

      if (!this.newCharacter) {
        return false
      }

      this.$http.post('characters', {
        world_id: this.selectedWorldId,
        id: this.newCharacter.id
      }).then(response => {
        this.dialogVisible = false
        this.adding = false
        this.characters.push(response.data)
        this.newCharacter = null
        this.$message.success(strings.adding_succeeded)
      }, response => {
        this.adding = false
        if (response.status === 422) {
          this.validationErrors = response.data
        } else {
          this.$message.error(strings.adding_failed)
        }
      })
    },
    setMain (character) {
      this.characters.forEach((c, index) => {
        if (c.id !== character.id) {
          this.characters[index].status = 1
        }
      })
    },
    removeCharacter (character) {
      this.characters = this.characters.filter(c => {
        return c.id !== character.id
      })
    }
  }
}
</script>
