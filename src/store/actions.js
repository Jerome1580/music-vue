import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// 选择列表中某个歌曲
// 一般是顺序播放，如果当前模式是随机播放，又去在原来的顺序列表（因为页面展示是按顺序的，打乱的只是播放顺序），点击了某个歌曲，则要找到打乱的歌曲index
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  // 如果是随机播放
  if (state.mode === playMode.random) {
    // 打乱播放列表
    let randomlist = shuffle(list)
    commit(types.SET_PLAYLIST, randomlist)
    // 找到当前这个歌曲，在打乱列表的中的索引
    index = findIndex(randomlist, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }

  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 随机播放
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomlist = shuffle(list)
  commit(types.SET_PLAYLIST, randomlist)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
