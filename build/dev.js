/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

const path = require('path')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const WebpackDevServer = require('webpack-dev-server')

module.exports = function (appName, opt) {
  const config = require(path.resolve(__dirname, `config`))(appName)
  const appConfig = require('./config/app.conf')(appName)

  const webpackConfig = process.env.NODE_ENV === 'testing' ?
    require('./config/prod.webpack.conf')(appName) :
    require('./config/dev.webpack.conf')(appName)

  const frontEndServerPort = config.dev.hotPort
  const proxyTable = config.dev.proxyTable
  const compiler = webpack(webpackConfig)

  const server = new WebpackDevServer(compiler, {
    clientLogLevel: 'info',
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
    proxy: config.dev.proxyTable,
    publicPath: webpackConfig.output.publicPath,
    headers: {
      'X-Custom-Header': 'yes'
    },
    inline: true,
    stats: {
      colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })

  if (appConfig.appType === 'mpa') {
    require(`./dev.server`)(appName)
  }

  server.listen(frontEndServerPort, 'localhost', function (err) {
    if (err) {
      console.log(err)

      return false
    }

    console.log(`Frontend server listening at http://localhost:${frontEndServerPort}\n`)
  })
}