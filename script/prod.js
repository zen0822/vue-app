const shelljs = require('shelljs')
shelljs.env.NODE_ENV = 'production'

const websiteProject = './zen0822.github.io'

module.exports = function ({
  appName = 'example',
  release = false,
  ci = false
} = {}) {
  const path = require('path')
  const config = require('./config')({
    appName: appName
  })
  const ora = require('ora')
  const webpack = require('webpack')

  const webpackConfig = require('./config/prod.webpack.conf')({
    appName: appName
  })

  const spinner = ora('building for production...')
  spinner.start()

  const assetsPath = path.join(config.prod.assetRoot, config.prod.assetSubDirectory)
  shelljs.rm('-rf', assetsPath)
  shelljs.mkdir('-p', assetsPath)

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()

    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
}
