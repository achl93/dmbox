import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    challengeRequired: false,
    challengeId: '',
    loggedIn: false
  },
  mutations: {
    toggleChallenge(state, id) {
      state.challengeRequired = !state.challengeRequired
      state.challengeId = id
    },
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn
    }
  },
  actions: {

  }
})
