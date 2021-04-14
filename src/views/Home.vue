<template>
  <div class="home">
    <h1>Items</h1>

    <h2>Add an item</h2>
    <form class="" @submit.prevent="create_item()">
      <input type="text" v-model="content" placeholder="Item">
      <input type="submit">
    </form>

    <h2>Existing Items</h2>

    <p class="toolbar">
      <span v-if="items.length > 0">{{items.length}} Items</span>

      <span class="spacer"/>

      <span>並べ替え / Sorting: </span>


      <button
        type="button"
        :class="{active: sorting ==='date' }"
        @click="sorting='date'">
        <CalendarIcon />
      </button>

      <button
        type="button"
        :class="{active: sorting ==='likes' }"
        @click="sorting='likes'">
        <ThumbUpIcon />
      </button>
    </p>

    <div class="loader_container" v-if="loading">
      <Loader>Loading items</Loader>
    </div>

    <div class="item_wrapper" v-else>
      <transition-group name="flip-list" tag="div">
        <Item
          link
          v-for="item in sorted_items"
          v-bind:key="item._id"
          v-bind:item="item"
          @vote="vote($event)"
          @deleteItem="delete_item($event)"/>
      </transition-group>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item.vue'
import Loader from '@moreillon/vue_loader'

import ThumbUpIcon from 'vue-material-design-icons/ThumbUp.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'


export default {
  name: 'Home',
  components: {
    Item,
    Loader,
    ThumbUpIcon,
    CalendarIcon,
  },
  data(){
    return {
      content: '',
      items: [],
      sorting: 'date',
      ordering: 1,
      loading: false,
    }
  },
  mounted(){
    this.get_items()
  },
  methods: {
    create_item(){
      if(!confirm('文句を登録しますか？')) return
      const url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/items`
      this.axios.post(url, { content: this.content })
      .then(() => {
        this.item_content = ''
        this.get_items()
      })
      .catch(error => console.log(error))
    },
    get_items(){
      this.loading = true
      const url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/items`
      this.axios.get(url)
      .then(response => {
        this.items.splice(0,this.items.length)
        response.data.forEach((item) => {
          this.items.push(item)
        })
      })
      .catch(error => console.log(error))
      .finally(() => this.loading = false)
    },

    delete_item(id){
      if(!confirm(`ホンマに？`)) return
      const url = `${process.env.VUE_APP_FEEDBACK_GATHERING_API_URL}/items/${id}`
      this.axios.delete(url)
      .then(() => {this.get_items()})
      .catch(error => console.log(error))
    },
  },
  computed: {
    sorted_items(){

      if(this.sorting === 'date'){
        return this.items.slice().sort((a, b) => {return new Date (b.date) - new Date (a.date)})
      }
      else {
        return this.items.slice().sort((a, b) => {return b.likes - a.likes})
      }

    }
  }

}
</script>

<style scoped>
.item_wrapper {
  margin-top: 1em;
}

.flip-list-move {
  transition: transform 1s;
}

button {
  cursor: pointer;
  margin: 0 0.25em;
  outline: none;
  border: none;
  background: white;
  color: currentcolor;
}

button.active {
  color: #c00000;
}

.loader_container {
  text-align: center;
  font-size: 200%;
}

.toolbar {
  display: flex;
  align-items: center;
}
.toolbar button {
  font-size: 120%;
}
.spacer {
  flex-grow: 1;
}

</style>
