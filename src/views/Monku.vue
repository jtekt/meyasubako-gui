<template>
  <div>
    <v-toolbar flat>
      <v-btn :to="{ name: 'Home' }" exact text>
        <v-icon left>mdi-arrow-left</v-icon>
        <span>戻る</span>
      </v-btn>
    </v-toolbar>

    <div class="loader_container" v-if="loading">
      <v-progress-circular indeterminate />
    </div>

    <template v-if="monku">
      <Item v-bind:item="monku" @vote="vote_monku($event)" />

      <v-form class="" @submit.prevent="submit_proposal()">
        <v-row align="center">
          <v-col>
            <v-text-field
              type="text"
              v-model="proposal_content"
              label="コメント"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn type="submit" icon>
              <v-icon>mdi-comment-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <transition-group name="flip-list" tag="div">
        <Item
          v-for="proposal in sorted_proposals"
          :key="proposal._id"
          :item="proposal"
          @vote="vote_proposal($event)"
        />
      </transition-group>
    </template>
  </div>
</template>

<script>
import Item from "@/components/Item.vue"

export default {
  name: "Monku",
  components: {
    Item,
  },
  data() {
    return {
      monku: null,
      proposal_content: "",
      loading: false,
    }
  },
  mounted() {
    this.get_monku()
  },
  methods: {
    submit_proposal() {
      if (!confirm("提案を登録しますか？")) return

      let url = `/monku/${this.monku._id}/proposals`
      this.axios
        .post(url, {
          content: this.proposal_content,
        })
        .then(() => {
          // Clear input
          this.proposal_content = ""

          // Reload data
          this.get_monku()
        })
        .catch((error) => console.log(error))
    },
    get_monku() {
      this.loading = true

      const url = `/monku/${this.$route.params.monku_id}`
      this.axios
        .get(url)
        .then(({ data }) => {
          this.monku = data[0]
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false))
    },

    vote_monku(data) {
      const url = `/monku/${this.$route.params.monku_id}/vote`

      this.axios
        .post(url, {
          vote: data.vote,
        })
        .then((response) => {
          this.monku.likes = response.data.value.likes
        })
        .catch((error) => console.log(error))
    },
    vote_proposal(data) {
      const url = `/proposals/${data.id}/vote`

      this.axios
        .post(url, {
          vote: data.vote,
        })
        .then((response) => {
          const found_proposal = this.monku.proposals.find(
            (proposal) => proposal._id === response.data.value._id
          )

          if (found_proposal) found_proposal.likes = response.data.value.likes
        })
        .catch((error) => console.log(error))
    },
  },
  computed: {
    sorted_proposals() {
      return this.monku.proposals.slice().sort((a, b) => b.likes - a.likes)
    },
    user_is_admin() {
      if (this.$store.state.user) {
        return !!this.$store.state.user.properties.isAdmin
      } else return false
    },
  },
}
</script>

<style scoped>
.loader_container {
  text-align: center;
  font-size: 200%;
}
</style>
