import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      // 如果有歌词了（因为每次切换song变化时就请求new Song实例，都会getLyric，浪费）
      return Promise.resolve((this.lyric))
    }
    return new Promise((resolve, reject) => {
      getLyric('001ZCrrt02TNPv').then((res) => {
        if (res.code === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.latest_song.songid,
    mid: musicData.albumMID,
    singer: filterSinger(musicData.singers),
    name: musicData.latest_song.track_name,
    album: musicData.albumName,
    duration: musicData.listen_count,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albumMID}.jpg?max_age=2592000`,
    url: `https://ws.stream.qqmusic.qq.com/${musicData.latest_song.songid}.m4a?fromtag=46`
  })
}

function filterSinger(singers) {
  let ret = []
  if (!singers) {
    return ''
  }
  singers.forEach((s) => {
    "use strict";
    ret.push(s.singer_name)
  })
  return ret.join('/')
}


export function createRecommendSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.albummid,
    singer: filterRecommendSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `https://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}


function filterRecommendSinger(singers) {
  let ret = []
  if (!singers) {
    return ''
  }
  singers.forEach((s) => {
    "use strict";
    ret.push(s.name)
  })
  return ret.join('/')
}
