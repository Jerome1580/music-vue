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
    getLyric('0035cAWK49CSs1').then((res) => {
      if (res.code === ERR_OK) {
        this.lyric = Base64.decode(res.lyric)
        console.log(this.lyric)
      }
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
