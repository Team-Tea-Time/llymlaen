<template>
  <div id="user-characters">
    <page-header title="Characters" />
    <content-container>
      <el-dialog title="Add Character" v-model="dialogAddVisible">
        <el-row>
          <el-col :lg="{span: 12, offset: 6}">
            <el-form>
              <el-form-item>
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
                :avatar="newCharacter.avatar"
                :name="newCharacter.name"
                :world="newCharacter.world"
              />
            </div>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button  size="large" @click="dialogAddVisible = false">Cancel</el-button>
          <el-button type="primary" size="large" @click="dialogAddVisible = false" :disabled="!newCharacter">Proceed</el-button>
        </span>
      </el-dialog>
      <el-row>
        <el-col :lg="{span: 12, offset: 6}" v-loading.body="isLoading">
          <character-row
             v-for="character in characters"
            :avatar="character.avatar"
            :name="character.name"
            :world="character.world"
          />
          <el-button type="primary" size="large" :style="{width: '100%'}" @click="dialogAddVisible = true">Add Character</el-button>
        </el-col>
      </el-row>
    </content-container>
  </div>
</template>

<script>
import debounce from 'debounce'
import { Message } from 'element-ui'

import CharacterRow from '../../Components/Character/Row'

export default {
  components: {
    CharacterRow
  },
  data () {
    return {
      characters: [],
      dialogAddVisible: false,
      newCharacter: null,
      searching: false,
      searchResults: []
    }
  },
  created () {
    this.$setLoading()
    this.fetch()

    this.search = debounce(this.search, 400)
  },
  methods: {
    fetch () {
      this.$http.get('/api/user/characters').then((response) => {
        this.characters = response.data
        this.$clearLoading()
      })
    },
    search (name) {
      if (name !== '') {
        this.searching = true
        this.$http.post('/api/character/search', { name }).then((response) => {
          this.searchResults = response.body
          this.searching = false
        })
      } else {
        this.searchResults = []
      }
    }
  }
}
</script>
