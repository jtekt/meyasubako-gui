<template>
  <div class="item">


    <router-link
      v-if="link"
      class="monku_content"
      :to="{ name: 'monku', query: {id: item._id} }">
      {{item.content}}
    </router-link>

    <span
      class="monku_content"
      v-else>
      {{item.content}}
    </span>

    <button
      v-if="user_is_admin"
      type="button"
      @click="delete_item(item._id)">
      <delete-icon/>
    </button>



    <button
      type="button"
      :class="{voted: voted === 1}"
      :disabled="voted !== 0"
      @click.stop="vote(item._id, 1)">
      <thumb-up-icon />
    </button>

    <span class="likes">{{item.likes}}</span>

    <button
      type="button"
      :class="{voted: voted === -1}"
      :disabled="voted !== 0"
      @click.stop="vote(item._id, -1)">
      <thumb-down-icon />
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
      voted: 0,
    }
  },
  components: {
    ThumbUpIcon,
    ThumbDownIcon,
    DeleteIcon
  },
  methods: {
    vote(id, vote){
      if(!confirm('ホンマに？')) return
      this.voted = vote
      this.$emit('vote', {id: id, vote: vote})
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{

  display: flex;
  align-items: stretch;
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid #dddddd;
}

.monku_content {
  display: flex;
  align-items: center;
  flex-grow: 1;
  color: currentCOlor;
  text-decoration: none;
}

.likes {
  font-size: 150%;
  margin: 0 0.5em;
}

button {
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

</style>
