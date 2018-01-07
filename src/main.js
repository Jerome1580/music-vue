import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

// body 下面div的点击没有300ms的延迟
import fastclick from 'fastclick'
fastclick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
});


Vue.prototype.$axios = axios;

import 'common/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
