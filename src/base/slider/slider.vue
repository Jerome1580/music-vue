<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    data(){
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted(){
      // 初始化bette-scroll，浏览器刷新大概17ms后
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();

        if (this.autoPlay) {
          this._play();
        }
      }, 20);

      // 改变屏幕大小后，需重新计算每个图的宽度，重新初始化BScroll
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true);
        this.slider.refresh();
      })
    },
    methods: {
      // 计算Slider的宽度
      _setSliderWidth(isResize){
        // 获取父元素下所有的子元素
        this.children = this.$refs.sliderGroup.children;

        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item');

          child.style.width = sliderWidth + 'px';
          width += sliderWidth
        }

        // 添加循环播放，需要增加2个宽度
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px';

      },
      // 初始化dots
      _initDots(){
        this.dots = new Array(this.children.length)
      },
      // 初始化Slider
      _initSlider(){
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        });

        // 滚动结束派发一个事件
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;

          this.currentPageIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._play()
          }
        })
      },
      // 自动播放
      _play(){
        let pageIndex = this.currentPageIndex + 1;

        this.timer = setTimeout(() => {
          if (pageIndex === 5) pageIndex = 0;
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    // 当组件内有定时器时，组件销毁时记得清理下定时器，是好的编程习惯，利于清理内存
    destroyed(){
      clearTimeout(this.timer);
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
