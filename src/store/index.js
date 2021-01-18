import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    votes: [],
  },
  mutations: {
    set_user(state,user){
      state.user = user
    },
    add_vote(state, vote){
      state.votes.push(vote)
    }
  },
  actions: {
  },
  modules: {
  }
})
