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

      <div class="monku" v-for="complaint in sorted_complaints" v-bind:key="complaint._id">
        <span class="likes">いいね x {{complaint.likes}}</span>
        <span>{{complaint.content}}</span>
        <button type="button" @click="like(complaint._id)">いいね！</button>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {

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
    like(id){
      this.axios.post(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/like`, {
        _id: id
      })
      .then(() => this.get_monku())
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
.monku{
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
.monku button {
  margin-left: auto;
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
