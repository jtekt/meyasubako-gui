import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    votes: [],
  },
  mutations: {
    addVote(state, vote) {
      state.votes.push(vote)
      localStorage.setItem("votes", JSON.stringify(state.votes))
    },
    setVotes(state, votes) {
      state.votes = votes
    },
  },
  actions: {},
  modules: {},
})
