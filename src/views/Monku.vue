<template>
  <div class="home">
    <h1>アイテム</h1>

    <div class="loader_container" v-if="loading">
      <v-progress-circular indeterminate />
    </div>

    <template v-if="monku">
      <Item
        v-bind:item="monku"
        @vote="vote_monku($event)"
        @deleteItem="delete_monku($event)"
      />

      <h2>コメント</h2>

      <h3>コメント追加</h3>
      <form class="" @submit.prevent="submit_proposal()">
        <input type="text" v-model="proposal_content" placeholder="提案内容" />
        <input type="submit" />
      </form>

      <h3>今までのコメント</h3>
      <transition-group name="flip-list" tag="div">
        <Item
          v-for="proposal in sorted_proposals"
          v-bind:key="proposal._id"
          v-bind:item="proposal"
          @vote="vote_proposal($event)"
          @deleteItem="delete_proposal($event)"
        />
      </transition-group>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

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
    //this.get_proposals()
  },
  methods: {
    submit_proposal() {
      if (!confirm("提案を登録しますか？")) return

      let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku/${this.monku._id}/proposals`
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

      let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku/${this.$route.params.monku_id}`
      this.axios
        .get(url)
        .then((response) => {
          this.monku = response.data[0]
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false))
    },
    get_proposals() {
      let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku/${this.$route.params.monku_id}/proposals`

      this.axios
        .get(url)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => console.log(error))
    },
    vote_monku(data) {
      let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku/${this.$route.params.monku_id}/vote`

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
      const url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/proposals/${data.id}/vote`

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
    delete_monku(id) {
      if (confirm(`ホンマに？`)) {
        let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku/${id}`
        this.axios
          .delete(url)
          .then(() => {
            this.$router.push("/")
          })
          .catch((error) => console.log(error))
      }
    },
    delete_proposal(id) {
      if (confirm(`ホンマに？`)) {
        let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/proposals/${id}`
        this.axios
          .delete(url)
          .then(() => {
            // Reload data
            this.get_monku()
          })
          .catch((error) => console.log(error))
      }
    },
  },
  computed: {
    sorted_proposals() {
      return this.monku.proposals.slice().sort((a, b) => {
        return b.likes - a.likes
      })
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
.monku_wrapper {
  margin-top: 1em;
}
.monku {
  display: flex;
  align-items: center;
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid #dddddd;
}

.monku .likes {
  padding-right: 0.5em;
  border-right: 1px solid #dddddd;
  margin-right: 0.5em;
}

.spacer {
  flex-grow: 1;
}

.new_button_wrapper {
  display: flex;
  justify-content: center;
}
.new_button {
  text-decoration: none;
  color: currentColor;
  padding: 0.5em;
  border: 1px solid #444444;
  border-radius: 0.5em;
}
.flip-list-move {
  transition: transform 1s;
}

.loader_container {
  text-align: center;
  font-size: 200%;
}
</style>
