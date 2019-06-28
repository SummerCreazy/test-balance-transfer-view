import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import channel from './module/channel'
import chaincode from './module/chaincode'
import client from './module/client'
import system from './module/system'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    channel,
    chaincode,
    client,
    system
  }
})
