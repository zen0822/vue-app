module.exports = function (appName, opt = {}) {
  const path = require('path')
  const webpack = require('webpack')
  const merge = require('webpack-merge')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const DashboardPlugin = require('webpack-dashboard/plugin')

  const config = require(path.resolve(__dirname, `./index`))(appName)
  const utils = require(path.resolve(__dirname, `./../utils`))(appName)

  const appConfig = require('./app.conf')(appName)
  const port = process.env.PORT || config.dev.hotPort

  const baseWebpackConfig = require('./base.webpack.conf')(appName)
  const template = appConfig.appTpl ?
    path.resolve(__dirname, `${config.global.appDir}/${appName}/index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  let devEntry = {}

  if (config.appType === 'spa') {
    devEntry = baseWebpackConfig.entry[appName].slice().concat([
      `webpack-dev-server/client?http://0.0.0.0:${config.dev.hotPort}`,
      'webpack/hot/dev-server'
    ])
  } else {
    Object.keys(baseWebpackConfig.entry).forEach((entryName) => {
      Object.assign(devEntry, {
        [entryName]: baseWebpackConfig.entry[entryName].concat([
          `webpack-dev-server/client?http://0.0.0.0:${config.dev.hotPort}`,
          'webpack/hot/dev-server'
        ])
      })
    })
  }

  delete baseWebpackConfig.entry

  const devConf = merge(baseWebpackConfig, {
    entry: devEntry,

    devtool: '#eval-source-map',

    plugins: [
      new DashboardPlugin(),

      new webpack.LoaderOptionsPlugin({
        debug: true
      }),

      new webpack.DefinePlugin({
        'process.env': config.dev.env
      }),

      new webpack.HotModuleReplacementPlugin(),

      new webpack.NamedModulesPlugin(),

      new webpack.NoEmitOnErrorsPlugin(),

      new webpack.optimize.OccurrenceOrderPlugin()
    ]
  })

  if (appConfig.appType === 'spa') {
    devConf.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template,
        inject: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      })
    )
  }

  return devConf
}