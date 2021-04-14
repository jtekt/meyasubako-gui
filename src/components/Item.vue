<template>
  <div
    class="item"
    :class="{hoverable: link}">

    <span class="date">{{formatted_date}}</span>

    <router-link
      v-if="link"
      class="item_content"
      :to="{ name: 'item', params: {item_id: item._id} }">
      {{item.content}}
    </router-link>

    <span
      class="item_content"
      v-else>
      {{item.content}}
    </span>

    <button
      type="button"
      :class="{voted: user_vote === 1}"
      :disabled="user_vote"
      @click.stop="vote_local(1)">
      <thumb-up-icon />
    </button>

    <span class="likes">{{item.likes}}</span>

    <button
      type="button"
      :class="{voted: user_vote === -1}"
      :disabled="user_vote"
      @click.stop="vote_local(-1)">
      <thumb-down-icon />
    </button>

    <!-- Delete button for admin -->
    <button
      v-if="user_is_admin"
      type="button"
      @click="delete_item(item._id)">
      <delete-icon/>
    </button>


  </div>

</template>

<script>
import ThumbUpIcon from 'vue-material-design-icons/ThumbUp.vue'
import ThumbDownIcon from 'vue-material-design-icons/ThumbDown.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

export default {
  name: 'Item',
  props: {
    item: Object,
    link: {
      type: Boolean,
      default() {return false}
    }
  },
  data(){
    return {
    }
  },
  components: {
    ThumbUpIcon,
    ThumbDownIcon,
    DeleteIcon
  },
  methods: {
    vote_local(vote){
      const id = this.item._id
      const url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/items/${id}/vote`
      this.axios.post(url, { vote })
      .then( () => {
        this.$store.commit('add_vote', {id, vote})
        this.$cookies.set("votes", JSON.stringify(this.$store.state.votes))
        this.item.likes += vote
      })
      .catch(error => console.log(error))
    },
    delete_item(id){
      this.$emit('deleteItem', id)
    }
  },
  computed: {
    user_is_admin(){
      if(this.$store.state.user){
        return !!this.$store.state.user.properties.isAdmin
      }
      else return false
    },
    formatted_date(){
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'

      }

      const date_date = new Date(this.item.date)
      return date_date.toLocaleString('ja-JP', options)
    },
    user_vote(){
      const found_vote = this.$store.state.votes.find(stored_vote => {return stored_vote.id === this.item._id})
      if(!found_vote) return null
      return found_vote.vote
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0.5em;
  margin: 1em 0;
  border: 1px solid #dddddd;
}

.item > *:not(:last-child){
  margin-right: 0.5em;
}

a {
  color: currentCOlor;
  text-decoration: none;
}

.item_content {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.likes {
  font-size: 150%;
  margin: 0 0.5em;
}

button {
  font-size: 150%;
  border: none;
  outline: none;
  background: transparent;
}

button:hover {
  color: #c00000;
}

.voted {
  color: #c00000;
}

.hoverable {
  transition: background-color 0.25s;
}

.hoverable:hover {
  background-color: #eeeeee;
}

.proposal_count {
  flex-shrink: 0;
}

button {
  cursor: pointer;
}

.date {
  color: #666666;
  font-size: 75%;
}

</style>
