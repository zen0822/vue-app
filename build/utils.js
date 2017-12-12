const fs = require('fs')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (appName, opt = {}) {
  const config = require('./config')(appName)

  return {
    entryHub(path) {
      return fs.readdirSync(path).map((item) => {
        return item.replace('.js', '')
      })
    },

    /**
     * 清空文件夹
     */
    emptyDir(dirPath) {
      const emptyDir = function (fileUrl) {
        const files = fs.readdirSync(fileUrl)

        files.forEach(function (fileName) {
          const stats = fs.statSync(`${fileUrl}/${fileName}`)

          if (stats.isDirectory()) {
            return emptyDir(`${fileUrl}/${fileName}`)
          } else {
            if (fileName === 'error.pug') {
              return false
            }

            return fs.unlinkSync(`${fileUrl}/${fileName}`)
          }
        })
      }

      return emptyDir(dirPath)
    },

    assetsPath(_path) {
      var assetSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetSubDirectory :
        config.dev.assetSubDirectory

      return path.posix.join(assetSubDirectory, _path)
    },

    cssLoaders(options) {
      options = options || {}
      // generate loader string to be used with extract text plugin
      function generateLoaders(loaders) {
        var sourceLoader = loaders.map(function (loader) {
          var extraParamChar
          if (/\?/.test(loader)) {
            loader = loader.replace(/\?/, '-loader?')
            extraParamChar = '&'
          } else {
            loader = loader + '-loader'
            extraParamChar = '?'
          }
          return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        if (options.extract) {
          return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
        } else {
          return ['vue-style-loader', sourceLoader].join('!')
        }
      }

      // http://vuejs.github.io/vue-loader/configurations/extract-css.html
      return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
      }
    },

    styleLoaders(options) {
      var output = []
      var loaders = exports.cssLoaders(options)
      for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
          test: new RegExp('\\.' + extension + '$'),
          loader: loader
        })
      }
      return output
    }
  }
}