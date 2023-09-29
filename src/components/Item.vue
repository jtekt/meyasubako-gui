<template>
  <v-card outlined class="my-2">
    <v-card-text>
      <v-row align="center">
        <v-col cols="auto">
          {{ formatted_date }}
        </v-col>
        <v-col>
          {{ item.content }}
        </v-col>
        <v-col cols="2">
          <v-row justify="center" align="center" dense>
            <v-col cols="auto">
              <v-btn
                icon
                :class="{ voted: user_vote === 1 }"
                :disabled="user_vote"
                @click.stop="vote(item._id, 1)"
                class="black--text"
              >
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto" class="black--text">{{ item.likes }}</v-col>
            <v-col cols="auto">
              <v-btn
                icon
                :class="{ voted: user_vote === -1 }"
                :disabled="user_vote"
                @click.stop="vote(item._id, -1)"
                class="black--text"
              >
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="1" v-if="link">
          <v-btn
            :to="{ name: 'monku', params: { monku_id: item._id } }"
            text
            class="grey--text"
          >
            <v-icon left>mdi-comment</v-icon>
            x {{ item.likes }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
    link: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {}
  },
  components: {},
  methods: {
    vote(id, vote) {
      this.voted = vote
      this.$emit("vote", { id, vote })

      this.$store.commit("add_vote", { id, vote })
      this.$cookies.set(
        "complaints_votes",
        JSON.stringify(this.$store.state.votes)
      )
    },
    delete_item(id) {
      this.$emit("deleteItem", id)
    },
  },
  computed: {
    formatted_date() {
      let options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }

      let timestamp_date = new Date(this.item.timestamp)
      return timestamp_date.toLocaleString("ja-JP", options)
    },
    user_vote() {
      const found_vote = this.$store.state.votes.find((stored_vote) => {
        return stored_vote.id === this.item._id
      })
      if (!found_vote) return null
      return found_vote.vote
    },
  },
}
</script>
