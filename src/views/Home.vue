<template>
  <div class="home">
    <h1>無駄削減</h1>
    <p>無駄削減のために、効率が悪い手続きについての文句をここにリストアップしましょう！</p>

    <h2>文句追加</h2>
    <form class="" @submit.prevent="submit()">
      <input type="text" v-model="monku_content" placeholder="文句内容">
      <input type="submit">
    </form>

    <h2>ある文句</h2>
    <p>文句をクリックすると対策の提案書けるようになります</p>

    <p class="toolbar">
      <span v-if="complaints.length > 0">{{complaints.length}} Items</span>

      <span class="spacer"/>

      <span>並べ替え / Sorting: </span>


      <button
        type="button"
        :class="{active: sorting ==='timestamp' }"
        @click="sorting='timestamp'">
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

    <div class="monku_wrapper" v-else>
      <transition-group name="flip-list" tag="div">
        <Item
          link
          v-for="complaint in sorted_complaints"
          v-bind:key="complaint._id"
          v-bind:item="complaint"
          @vote="vote($event)"
          @deleteItem="delete_monku($event)"/>
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
      monku_content: '',
      complaints: [],
      sorting: 'timestamp',
      ordering: 1,
      loading: false,
    }
  },
  mounted(){
    this.get_monku()
  },
  methods: {
    submit(){
      if(!confirm('文句を登録しますか？')) return
      this.axios.post(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku`, {
        content: this.monku_content
      })
      .then(() => {
        this.monku_content = ''
        this.get_monku()
      })
      .catch(error => console.log(error))
    },
    get_monku(){
      this.loading = true
      this.axios.get(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku`)
      .then(response => {
        this.complaints.splice(0,this.complaints.length)
        response.data.forEach((complaint) => {
          this.complaints.push(complaint)
        })
      })
      .catch(error => console.log(error))
      .finally(() => this.loading = false)
    },
    vote(data){
      let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku/${data.id}/vote`
      this.axios.post(url, {
        vote: data.vote,
      })
      .then((response) => {
        let found_complaint = this.complaints.find(complaint => { return complaint._id === response.data.value._id
        })

        if(found_complaint) found_complaint.likes = response.data.value.likes
      })
      .catch(error => console.log(error))
    },
    delete_monku(id){
      if(confirm(`ホンマに？`)){
        let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku/${id}`
        this.axios.delete(url)
        .then(() => {this.get_monku()})
        .catch(error => console.log(error))
      }
    },
  },
  computed: {
    sorted_complaints(){

      if(this.sorting === 'timestamp'){
        return this.complaints.slice().sort((a, b) => {return new Date (b.timestamp) - new Date (a.timestamp)})
      }
      else {
        return this.complaints.slice().sort((a, b) => {return b.likes - a.likes})
      }

    }
  }

}
</script>

<style scoped>
.monku_wrapper {
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
