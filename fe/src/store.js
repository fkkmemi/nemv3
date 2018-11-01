import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token')
  },
  mutations: {
    getToken (state) {
      state.token = localStorage.getItem('token')
    },
    delToken (state) {
      localStorage.removeItem('token')
      state.token = null
    }
  },
  actions: {

  }
})
