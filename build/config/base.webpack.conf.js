const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (appName, opt = {}) {
  const path = require('path')
  const webpack = require('webpack')

  const config = require(path.resolve(__dirname, `./index`))(appName)
  const utils = require(path.resolve(__dirname, `./../utils`))(appName)

  const entryConfig = {}

  if (config.appType === 'spa') {
    Object.assign(entryConfig, {
      [appName]: [
        'babel-polyfill',
        path.resolve(__dirname, `${config.global.appDir}/${appName}/app`)
      ]
    })
  } else {
    const entryHub = utils.entryHub(
      path.resolve(__dirname, `${config.global.appDir}/${appName}/client/entry`)
    )

    entryHub.forEach((entryName) => {
      Object.assign(entryConfig, {
        [entryName]: [
          'babel-polyfill',
          path.resolve(__dirname, `${config.global.appDir}/${appName}/client/entry/${entryName}`)
        ]
      })
    })
  }

  const baseConf = {
    entry: entryConfig,

    output: {
      path: config.build.assetsRoot,
      filename: 'js/[name].bundle.js'
    },

    stats: 'verbose',

    context: path.resolve(__dirname, 'app'),

    node: {
      fs: 'empty',
      net: 'empty'
    },

    resolve: {
      modules: ['node_modules', path.resolve(__dirname, `${config.global.root}/src/scss`)],
      extensions: ['.js', '.jsx'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'rootDir': path.resolve(__dirname, `${config.global.root}`),
        'appDir': path.resolve(__dirname, `${config.global.appDir}/${appName}`),
        'appClient': path.resolve(__dirname, `${config.global.appDir}/${appName}/client`),
        'appAsset': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/asset`),
        'appComp': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/component`),
        'appRoute': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/route`),
        'appScss': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/scss`),
        'appVuex': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/vuex`),
        'appUtil': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/util`),
        'appServer': path.resolve(__dirname, `${config.global.appDir}/${appName}/server`)
      }
    },

    module: {
      rules: [{
        test: /\.vue$/,
        loader: 'vue',
        query: {
          loaders: utils.cssLoaders()
        }
      }, {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        query: {
          configFile: '.eslintrc.js',
          formatter: require('eslint-friendly-formatter')
        },
        exclude: [/node_modules/]
      }, {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }, {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.pug$/,
        loader: 'pug-loader'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      }]
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    }
  }

  return baseConf
}