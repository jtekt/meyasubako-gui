<template>
  <div class="home">
    <h1>Item</h1>


    <div class="loader_container" v-if="loading">
      <Loader>Loading</Loader>
    </div>

    <template v-if="item">

      <Item
        v-bind:item="item"
        @deleteItem="delete_item($event)"/>

      <h2>Comments</h2>

      <h3>New comment</h3>
      <form class="" @submit.prevent="create_subitem()">
        <input type="text" v-model="subitem_content" placeholder="Comment">
        <input type="submit" >
      </form>

      <h3>Existing comments</h3>
      <transition-group name="flip-list" tag="div">
        <Item
          v-for="subitem in sorted_subitems"
          v-bind:key="subitem._id"
          v-bind:item="subitem"
          @deleteItem="delete_subitem($event)"/>
      </transition-group>

    </template>



  </div>
</template>

<script>
// @ is an alias to /src

import Item from '@/components/Item.vue'
import Loader from '@moreillon/vue_loader'

export default {
  name: 'item',
  components: {
    Item,
    Loader,

  },
  data(){
    return {
      item: null,
      subitems: [],
      subitem_content: '',
      loading: false,
    }
  },
  mounted(){
    this.get_item()
    this.get_subitems()
  },
  methods: {
    create_subitem(){
      if(!confirm('Create subitem?')) return

      const url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/items/${this.item._id}/items`
      this.axios.post(url, { content: this.subitem_content })
      .then(() => {
        // Clear input
        this.subitem_content = ''

        // Reload data
        this.get_subitems()
      })
      .catch(error => console.error(error))
    },
    get_item(){
      this.loading = true

      let url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/items/${this.$route.params.item_id}`
      this.axios.get(url)
      .then(({data}) => { this.item = data })
      .catch(error => console.error(error))
      .finally(() => this.loading = false)

    },
    get_subitems(){
      const url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/items/${this.$route.params.item_id}/items`

      this.axios.get(url)
      .then(({data}) => { this.subitems = data })
      .catch(error => console.error(error))
    },
    delete_item(id){
      if(!confirm(`ホンマに？`)) return
      const url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/item/${id}`
      this.axios.delete(url)
      .then(() => { this.$router.push('/') })
      .catch(error => console.error(error))
    },
    delete_subitem(id){
      if(!confirm(`ホンマに？`)) return
      const url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/items/${id}`
      this.axios.delete(url)
      .then(() => { this.get_subitems() })
      .catch(error => console.error(error))
    },


  },
  computed: {
    sorted_subitems(){
      return this.subitems.slice().sort((a, b) => {return b.likes - a.likes});
    },
    user_is_admin(){
      if(this.$store.state.user){
        return !!this.$store.state.user.properties.isAdmin
      }
      else return false
    }
  }

}
</script>

<style scoped>
.item_wrapper {
  margin-top: 1em;
}
.item{
  display: flex;
  align-items: center;
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid #dddddd;
}

.item .likes {
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
