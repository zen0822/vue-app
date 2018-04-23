const path = require('path')

module.exports = function (appName, opt = {}) {
  const appDir = path.resolve(__dirname, `../../app/${appName}`)
  const appConfig = require('./app.conf')(appName)
  const mockPort = appConfig.mockPort ? appConfig.mockPort : 3000

  const config = Object.assign({}, appConfig, {
    global: {
      root: '../../',
      appDir: '../../app/'
    },
    build: {
      env: require('./prod.env'),
      assetRoot: path.resolve(appDir, appConfig.assetRoot),
      assetPublicPath: appConfig.assetPublicPath,
      assetSubDirectory: appConfig.assetSubDirectory,
      productionSourceMap: false,
      productionGzip: true,
      productionGzipExtensions: ['js', 'css']
    },
    dev: {
      env: require('./dev.env'),
      mockPort: mockPort,
      hotPort: appConfig.hotPort,
      assetPublicPath: '/',
      assetSubDirectory: appConfig.assetSubDirectory,
      proxyTable: {
        '/api/**': `http://localhost:${mockPort}`,
        '/dev/**': {
          target: `http://localhost:${appConfig.hotPort}`,
          changeOrigin: true,
          pathRewrite: {
            '^/dev': ''
          }
        },
        '/**.hot-update.*': {
          target: `http://localhost:${appConfig.hotPort}`,
          changeOrigin: true
        }
      },
      cssSourceMap: false
    },
    sourceMap: false
  })

  return config
}