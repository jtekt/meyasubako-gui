<template>
  <div class="home">
    <h1>面倒くさい</h1>

    <div class="new_button_wrapper">
      <router-link
        class="new_button"
        :to="{ name: 'new', params: {} }">
        New
      </router-link>
    </div>

    <div class="monku_wrapper">
      <transition-group name="flip-list" tag="div">

        <Item
          v-for="complaint in sorted_complaints"
          v-bind:key="complaint._id"
          v-bind:item="complaint"
          @vote="vote($event)"/>

      </transition-group>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item.vue'


export default {
  name: 'Home',
  components: {
    Item,
  },
  data(){
    return {
      complaints: []
    }
  },
  mounted(){
    this.get_monku()
  },
  methods: {
    get_monku(){
      this.axios.get(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku`)
      .then(response => {
        this.complaints.splice(0,this.complaints.length)
        response.data.forEach((complaint) => {
          this.complaints.push(complaint)
        })

      })
      .catch(error => console.log(error))
    },
    vote(data){

      this.axios.post(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/vote`, {
        _id: data.id,
        vote: data.vote,
        collection: 'monku',
      })
      .then((response) => {
        let found_complaint = this.complaints.find(complaint => { return complaint._id === response.data.value._id
        })

        if(found_complaint) found_complaint.likes = response.data.value.likes
      })
      .catch(error => console.log(error))

    },
  },
  computed: {
    sorted_complaints(){
      return this.complaints.slice().sort((a, b) => {return b.likes - a.likes});
    }
  }

}
</script>

<style scoped>
.monku_wrapper {
  margin-top: 1em;
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

</style>
