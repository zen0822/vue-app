const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = function ({
  appName,
  release
}) {
  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })

  const utils = require('./../utils')({
    appName
  })

  const baseWebpackConfig = require('./base.webpack.conf')({
    appName,
    extractScss: true
  })

  const template = config.tpl ?
    path.resolve(__dirname, `${config.global.root}/app/${appName}/index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  var webpackConfig = merge(baseWebpackConfig, {
    devtool: config.prod.sourceMap ? '#source-map' : false,
    output: {
      path: config.prod.assetRoot,
      publicPath: release ? '/' : config.prod.assetPublicPath,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    module: {
      rules: [{
        test: /(grid|util)\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: true,
            cache: true,
            ie8: false,
            parallel: true,
            output: {
              comments: false,
              beautify: false
            },
            sourceMap: config.prod.sourceMap || false,
            warnings: false
          }
        })
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': config.prod.env
      }),

      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [`${config.prod.assetRoot}/*`],
        verbose: true
      }),

      new HtmlWebpackPlugin({
        filename: config.prod.htmlName || 'index.html',
        template,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    ]
  })

  if (config.prod.gzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.prod.gzipExt.join('|')})$`)
      })
    )
  }

  return webpackConfig
}
