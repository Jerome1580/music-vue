<template>
  <div class="search">
    <div class="search-box-wrapper">
      <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <Scroll :refreshDelay="refreshDelay" class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <!--热门搜索-->
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{ item.k}}</span>
              </li>
            </ul>
          </div>
          <!--搜索历史-->
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
            </h1>
            <Searchlist :searches="searchHistory"
                        @select="addQuery"
                        @delete="deleteOne"
            ></Searchlist>
          </div>
        </div>
      </Scroll>
    </div>
    <div ref="searchResult" class="search-result" v-show="query">
      <Suggest ref="suggest" @select="saveSearch" :query="query" @listScroll="blurInput"></Suggest>
    </div>
    <Confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></Confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box/search-box'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import Suggest from 'components/suggest/suggest'
  import Searchlist from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
  import Scroll from 'base/scroll/scroll'
  import {mapActions} from 'vuex'
  import {playlistMixin, searchMixin} from 'common/js/mixin'

  export default {
    mixins: [playlistMixin, searchMixin],
    data(){
      return {
        hotKey: [],
      }
    },
    created(){
      this._getHotKey()
    },
    computed: {
      shortcut(){
        return this.hotKey.concat(this.searchHistory)
      }
    },
    methods: {
      handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()

        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
      },
      deleteOne(item){
        this.deleteSearchHistory(item)
      },
      showConfirm(){
        this.$refs.confirm.show()
      },
      _getHotKey(){
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch: {
      query(newQuery){
        // 从suggest显示，到搜索历史列表的展示，也有dom的变化（show）
        // 就是搜索关键字取消的时候，suggest消失，searchHistory显示，这时也要scroll更新一下，不然不会滚动
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          })
        }
      }
    },
    components: {
      SearchBox,
      Suggest,
      Searchlist,
      Confirm,
      Scroll
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
