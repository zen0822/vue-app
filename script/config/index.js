const path = require('path')

module.exports = function ({
  appName
}) {
  const appConfigPath = path.resolve(__dirname, '../../app/' + appName + '/app.config.js')
  const appConfig = require(appConfigPath)
  const appConfigDir = path.dirname(appConfigPath)
  const mockPort = appConfig.mockPort || 3000
  const gqlMock = appConfig.gqlMock || mockPort
  const assetSubDirectory = appConfig.assetSubDirectory || 'static'

  const config = {
    ...appConfig,
    api: appConfig.api,
    apiProd: appConfig.apiProd,
    dev: {
      env: require('./dev.env'),
      mockPort: mockPort || 3000,
      hotPort: appConfig.hotPort || 80,
      assetPublicPath: '/',
      assetSubDirectory: assetSubDirectory,
      proxyTable: {
        '/gql': {
          target: `http://localhost:${gqlMock}`,
          pathRewrite: {
            '^/gql': ''
          }
        },
        '/api/**': `http://localhost:${mockPort}`,
        '/sw.js': `http://localhost:5169`,
        ...appConfig.proxy
      },
      cssSourceMap: false
    },
    prod: {
      env: require('./prod.env'),
      htmlName: path.resolve(__dirname, `../../app/${appName}/dist/index.html`),
      assetRoot: path.resolve(appConfigDir, appConfig.assetRoot),
      assetSubDirectory: 'static',
      assetPublicPath: './',
      sourceMap: true,
      gzip: true,
      gzipExt: ['js', 'css']
    },
    sw: {
      env: require('./dev.env'),
      hotPort: 5169,
      assetRoot: path.resolve(appConfigDir, appConfig.assetRoot, './sw'),
      assetPublicPath: '/',
      assetSubDirectory: assetSubDirectory,
      prodSourceMap: false
    },
    gql: {
      port: gqlMock
    },
    global: {
      root: '../../',
      appDir: '../../app/'
    },
    https: appConfig.https,
    htmlName: appConfig.htmlName,
    type: 'spa',
    tpl: appConfig.tpl
  }

  return config
}
