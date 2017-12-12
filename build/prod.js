/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

const path = require('path')
const webpack = require('webpack')
const ora = require('ora')

module.exports = function (appName) {
  const spinner = ora('building for production...')
  const config = require('./config')(appName)
  const webpackConfig = require('./config/prod.webpack.conf')(appName)

  console.log(`构建文件将保存到 ${config.build.assetRoot} 目录下`)

  spinner.start()

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