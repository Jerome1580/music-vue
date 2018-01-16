module.exports = {
  proxyList: {
    '/api/getDiscList': {
      target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
      changeOrigin: true,
      onProxyReq(proxyReq, req, res){
        proxyReq.setHeader('Referer', 'https://c.y.qq.com')
        proxyReq.setHeader('Host', 'c.y.qq.com')
      },
      pathRewrite: {
        '^/api/getDiscList': ''
      }
    },
    '/api/getSongList': {
      target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
      changeOrigin: true,
      onProxyReq(proxyReq, req, res){
        proxyReq.setHeader('Referer', `https://y.qq.com/n/yqq/playlist/${req.query.disstid}.html`)
        proxyReq.setHeader('Host', 'c.y.qq.com')
      },
      pathRewrite: {
        '^/api/getSongList': ''
      }
    }
  }
}
