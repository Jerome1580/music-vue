<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    computed: {
      title(){
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created(){
      this._getSongList()
    },
    methods: {
      _getSongList(){
        getSongList(this.disc.dissid).then((res) => {
          if (typeof res === 'string') {
            var reg = /^\w+\(({.+})\)$/
            var matches = res.match(reg)
            if (matches) {
              res = JSON.parse(matches[1])
            }
          }
          if (res.code === ERR_OK) {
            console.log(res.cdlist[0].songlist)
          }
        })
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
