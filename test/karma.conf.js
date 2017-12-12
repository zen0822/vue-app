/**
 * 使用 mocha 测试框架 http://mochajs.org/
 * chai 的 测试断言框架 http://chaijs.com/api/bdd/#method_a
 * 使用 karam 测试服务 https://karma-runner.github.io/1.0/index.html
 */

const path = require('path')

module.exports = function (appName) {
  const webpackConf = require('../build/config/base.webpack.conf')(appName)
  delete webpackConf.entry

  return {
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 120000,
    colors: true,
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    preprocessors: {
      '**/*.test.js': ['webpack', 'sourcemap', 'coverage']
    },
    port: 9978,
    reporters: ['spec', 'coverage'],
    singleRun: false,
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
  }
}