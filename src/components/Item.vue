<template>
  <div class="item">
    <router-link
      :to="{ name: 'monku', query: {id: item._id} }">
      {{item.content}}
    </router-link>

    <button type="button" @click.stop="vote(item._id, 1)"><thumb-up-icon /></button>
    <span class="likes">{{item.likes}}</span>
    <button type="button" @click.stop="vote(item._id, -1)"><thumb-down-icon /></button>


  </div>






</template>

<script>
import ThumbUpIcon from 'vue-material-design-icons/ThumbUp.vue';
import ThumbDownIcon from 'vue-material-design-icons/ThumbDown.vue';
export default {
  name: 'Item',
  props: {
    item: Object
  },
  components: {
    ThumbUpIcon,
    ThumbDownIcon
  },
  methods: {
    vote(id, vote){
      this.$emit('vote', {id: id, vote: vote})
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

a {
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

</style>
