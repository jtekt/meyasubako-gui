<template>
  <div>
    <v-toolbar flat>
      <v-btn :to="{ name: 'Items' }" exact text>
        <v-icon left>mdi-arrow-left</v-icon>
        <span>戻る</span>
      </v-btn>
    </v-toolbar>

    <div class="loader_container" v-if="loading">
      <v-progress-circular indeterminate />
    </div>

    <template v-if="monku">
      <Item v-bind:item="monku" @vote="vote_monku($event)" />

      <h3 class="mt-6">コメント</h3>

      <v-form class="" @submit.prevent="submit_proposal()">
        <v-row align="center">
          <v-col>
            <v-textarea
              v-model="proposal_content"
              label="新しいコメント"
              rows="1"
              auto-grow
              hint="コメントは匿名で登録されます"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn type="submit">
              <v-icon left>mdi-comment-plus</v-icon>
              送信
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
          this.proposal_content = ""
          this.get_monku()
        })
        .catch((error) => console.log(error))
    },
    get_monku() {
      this.loading = true

      const url = `/monku/${this.$route.params.item_id}`
      this.axios
        .get(url)
        .then(({ data }) => {
          this.monku = data[0]
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false))
    },

    vote_monku(data) {
      const url = `/monku/${this.$route.params.item_id}/vote`

      this.axios
        .post(url, {
          vote: data.vote,
        })
        .then((response) => {
          this.monku.likes = response.data.value.likes
        })
        .catch((error) => console.error(error))
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
        .catch((error) => console.error(error))
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
