const { defineConfig } = require('@vue/cli-service')

console.log('Loading vue.config.js...')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.PORT || 0,
    proxy: {
      '/v1': {
        target: 'http://192.168.6.115:1660',
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          '^/v1': '/v1'  // 路径重写
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, LoginAuthUser'
        }
      }
    },
    onBeforeSetupMiddleware(devServer) {
      devServer.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, LoginAuthUser')
        next()
      })
    }
  }
})
