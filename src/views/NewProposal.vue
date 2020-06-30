<template>
  <div class="home">
    <h1>新しい提案</h1>
    <form class="" @submit.prevent="submit_proposal()">
      <input type="text" v-model="content" placeholder="内容">
      <input type="submit">
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'NewProposal',
  components: {

  },
  data(){
    return {
      content: ''
    }
  },
  methods: {
    submit_proposal(){
      let url = `${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku/${this.$route.query.id}/proposals`
      console.log(url)
      this.axios.post(url, {
        content: this.content,
      })
      .then(() => {
        this.$router.push({name: 'monku', query: {id: this.$route.query.id}})
      })
      .catch(error => {
        if(error.response) console.log(error.response.data)
        else console.log(error)
      })
    },
  }

}
</script>

<style scoped>
form {
  display: flex;
}

form input[type="text"]{
  flex-grow: 1;
}
</style>
