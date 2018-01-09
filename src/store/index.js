import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state  from './state'
import mutations  from './mutations'

// 看日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // 开启严格模式，判断state的改变是不是由mutations触发的
  strict: debug,
  plugins: debug ? [createLogger()] : []

})
