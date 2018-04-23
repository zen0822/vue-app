const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

module.exports = function (appName, opt = {}) {
  const utils = require('../utils')(appName)
  const config = require('./index')(appName)
  const appConfig = require('./app.conf')(appName)
  const baseWebpackConfig = require('./base.webpack.conf')(appName)

  const env = process.env.NODE_ENV === 'testing' ?
    require('../config/test.env') :
    config.build.env

  const template = appConfig.appTpl ?
    path.resolve(__dirname, `${config.global.appDir}/${appName}/index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  const webpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? '#source-map' : false,

    output: {
      path: config.build.assetRoot,
      publicPath: config.build.assetPublicPath
    },

    module: {
      rules: [{
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }]
    },

    plugins: [
      new CleanWebpackPlugin([`${config.build.assetRoot}/*`], {
        root: path.resolve(__dirname, config.global.root),
        verbose: true
      }),
      new webpack.DefinePlugin({
        'process.env': env
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          output: {
            comments: false,
            beautify: false
          },
          compress: true,
          warnings: false
        }
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].bundle.css',
        allChunks: true
      })
    ]
  })

  if (appConfig.appType === 'spa') {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template,
        inject: true
      })
    )
  }

  if (appConfig.spaCodeSplit) {
    webpackConfig.plugins.push(
      new PrerenderSpaPlugin({
        staticDir: config.doc.assetsRoot,
        routes: appConfig.spaPrerenderRoute,
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true
        },
        renderer: new Renderer({
          renderAfterTime: 500
        })
      })
    )
  }

  if (appConfig.gzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  return webpackConfig
}