const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = function ({
  appName,
  extractScss = false
} = {}) {
  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })
  const utils = require(path.resolve(__dirname, `./../utils`))({
    appName
  })
  const globalRoot = config.global.root
  let extractTextScss = null

  if (extractScss) {
    extractTextScss = new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[hash].css')
    })
  }

  let configRule = [{
    test: /\.vue$/,
    loader: 'vue',
    query: {
      loaders: utils.cssLoaders()
    }
  }, {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      esModule: true
    }
  }, {
    test: /\.jsx?$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    query: {
      configFile: '.eslintrc.js',
      formatter: require('eslint-friendly-formatter')
    },
    exclude: [/node_modules/]
  }, {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader'
    },
    exclude: [/node_modules/]
  }, {
    test: /\.tsx?$/,
    enforce: 'pre',
    exclude: /node_modules/,
    loader: 'tslint-loader',
    options: {
      typeCheck: true
    }
  }, {
    test: /\.tsx?$/,
    exclude: [/node_modules/],
    use: [
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          appendTsxSuffixTo: [/\.vue$/],
          transpileOnly: true,
          experimentalWatchApi: true,
          compilerOptions: {
            module: 'es6',
            noEmit: true
          }
        }
      }
    ]
  }, {
    test: /\.(css|scss)$/,
    use: [
      extractScss ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ],
    exclude: [/(grid|util)\.scss$/]
  }, {
    test: /\.(tpl)$/,
    loader: 'html-loader'
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
  }]

  if (Array.isArray(config.loaderRule)) {
    configRule = configRule.concat(config.loaderRule)
  }

  const entryConfig = {}

  if (config.type === 'spa') {
    Object.assign(entryConfig, {
      app: [
        path.resolve(__dirname, `${globalRoot}/app/${appName}/app.js`)
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
    mode: 'production',

    entry: entryConfig,

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },

    output: {
      publicPath: config.dev.assetPublicPath,
      path: config.prod.assetRoot,
      filename: '[name].[hash].js',
      pathinfo: false
    },

    stats: 'verbose',

    context: path.resolve(__dirname, `${globalRoot}`),

    resolve: {
      modules: ['node_modules', path.resolve(__dirname, `${globalRoot}/src/scss`)],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'vue2do': path.resolve(__dirname, `${globalRoot}`),
        'src': path.resolve(__dirname, `${globalRoot}/src`),
        'appDir': path.resolve(__dirname, `${config.global.appDir}/${appName}`),
        'appClient': path.resolve(__dirname, `${config.global.appDir}/${appName}/client`),
        'appAsset': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/asset`),
        'appComp': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/component`),
        'appRoute': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/route`),
        'appScss': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/scss`),
        'appVuex': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/vuex`),
        'appUtil': path.resolve(__dirname, `${config.global.appDir}/${appName}/client/util`),
        'appServer': path.resolve(__dirname, `${config.global.appDir}/${appName}/server`)
      },
      symlinks: false
    },

    module: {
      rules: configRule
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin({
        tslint: true,
        async: true,
        watch: [path.resolve(__dirname, `${globalRoot}/example/server`)],
        reportFiles: [path.resolve(__dirname, `${globalRoot}/example/server`)]
      })
    ]
  }

  if (extractScss) {
    baseConf.plugins.push(extractTextScss)
  }

  return baseConf
}
