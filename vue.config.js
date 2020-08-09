// //增加vue.config.js文件配置css
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
              @import "~@/style/index.scss";
            `,
      },
    },
  },

  devServer: {
    port: 8080, //源地址端口
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true, // 允许跨域
        pathRewrite: { // 重写路径
          '^/api': ''
        }
      }
    }
  }


};