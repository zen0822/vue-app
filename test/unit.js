/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

module.exports = function (appName) {
  const cfg = require('karma').config
  const path = require('path')

  const karmaConfig = Object.assign(
    require('./karma.conf.js')(appName), {
      coverageReporter: {
        dir: path.resolve(__dirname, `../app/${appName}/client/test/coverage`),
        reporters: [{
            type: 'html'
          },
          {
            type: 'lcov',
            subdir: 'lcov'
          }
        ]
      },
      files: [
        `./app/${appName}/client/test/unit/**/*.test.js`
      ]
    }
  )

  const TestServer = require('karma').Server
  const testServer = new TestServer(karmaConfig, function (exitCode) {
    console.log('Karma unit test server has exited with ' + exitCode)

    process.exit(exitCode)
  })

  testServer.start()
}