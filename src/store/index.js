import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  broadcasts: [],
  playQueued: [],
  broadcastSrc: [],
  timer: null
}


export default new Vuex.Store({
  state,
  // getters,
  actions,
  mutations
  // plugins: process.env.NODE_ENV !== 'production'
  //   ? [createLogger()]
  //   : []
})
