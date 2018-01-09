import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer){
    "use strict";
    state.singer = singer
  }
}

export default mutations
