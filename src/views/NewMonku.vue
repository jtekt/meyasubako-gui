<template>
  <div class="home">
    <h1>新しい文句</h1>
    <form class="" @submit.prevent="submit()">
      <input type="text" v-model="content" placeholder="内容">
      <input type="submit">
    </form>
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
      content: ''
    }
  },
  methods: {
    submit(){
      this.axios.post(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku`, {
        content: this.content
      })
      .then(() => {
        this.$router.push({name: 'Home'})
      })
      .catch(error => console.log(error))
    }
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
