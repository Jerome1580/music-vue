<template>
  <transition name="slide">
    <music-list
      :songs="songs"
      :title="title"
      :bg-image="bgImage"
    ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'


  export default {
    data(){
      return {
        songs: []
      }
    },
    computed: {
      title(){
        return this.singer.name
      },
      bgImage(){
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._getDetail();
    },
    methods: {
      _getDetail(){
        if (!this.singer.id) {
          // 如果没有歌手，则退回去
          this.$router.push('/singer')
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach((item) => {
          if (item.albumID && item.albumMID) {
            ret.push(createSong(item))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable"


  .slide-enter-active, .slide-leave-active
    transition all .3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
