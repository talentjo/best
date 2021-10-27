import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collectionNames: [],
    userLoggedIn: false,
    CSRFtoken: null
  },
  mutations: {
    setCollectionNames (state, payload) {
      if (state.collectionNames !== payload) {
        state.collectionNames = payload
      }
    },
    login (state) {
      state.userLoggedIn = true
    },
    logout (state) {
      state.userLoggedIn = false
    },
    setCSRFtoken (state, payload) {
      state.CSRFtoken = payload
    }
  },
  actions: {

  },
  getters: {
    isUserLoggedIn (state) {
      return state.userLoggedIn
    }
  }
})
