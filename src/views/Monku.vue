<template>
  <div class="home">
    <h1>文句</h1>

    <template v-if="monku">

      <Item
        v-bind:item="monku"
        @vote="vote_monku($event)"/>

      <h2>Proposals</h2>
      <transition-group name="flip-list" tag="div">
        <Item
          v-for="proposal in sorted_proposals"
          v-bind:key="proposal._id"
          v-bind:item="proposal"
          @vote="vote_proposal($event)"/>
      </transition-group>







      <h2>New proposal</h2>
      <form class="" @submit.prevent="submit_proposal()">
        <input type="text" v-model="proposal_content">
        <input type="submit" >
      </form>
    </template>

  </div>
</template>

<script>
// @ is an alias to /src

import Item from '@/components/Item.vue'

export default {
  name: 'Monku',
  components: {
    Item,
  },
  data(){
    return {
      monku: null,
      proposal_content: '',
    }
  },
  mounted(){
    this.get_monku()
    //this.get_proposals()
  },
  methods: {
    submit_proposal(){
      this.axios.post(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/proposal`, {
        monku_id: this.$route.query.id,
        content: this.proposal_content,
      })
      .then(() => {
        this.get_monku()
      })
      .catch(error => console.log(error))
    },
    get_monku(){
      this.axios.get(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/monku`, {
        params: {_id: this.$route.query.id}
      })
      .then(response => {
        this.monku = response.data[0]
      })
      .catch(error => console.log(error))
    },
    get_proposals(){
      this.axios.get(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/proposal`, {
        params: {monku_id: this.$route.query.id}
      })
      .then(response => {
        console.log(response.data)

      })
      .catch(error => console.log(error))
    },
    vote_monku(data){
      this.axios.post(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/vote`, {
        _id: data.id,
        vote: data.vote,
        collection: 'monku',
      })
      .then((response) => {
        this.monku.likes = response.data.value.likes
      })
      .catch(error => console.log(error))
    },
    vote_proposal(data){
      this.axios.post(`${process.env.VUE_APP_MENDOKUSAI_API_URL}/vote`, {
        _id: data.id,
        vote: data.vote,
        collection: 'proposals',
      })
      .then((response) => {
        let found_proposal = this.monku.proposals.find(proposal => { return proposal._id === response.data.value._id
        })

        if(found_proposal) found_proposal.likes = response.data.value.likes
      })
      .catch(error => console.log(error))
    },

  },
  computed: {
    sorted_proposals(){
      return this.monku.proposals.slice().sort((a, b) => {return b.likes - a.likes});
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
</style>
