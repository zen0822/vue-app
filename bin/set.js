#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const argv = require('yargs')
  .usage('Usage: $0 --app [string]')
  .example('$0 --app example', 'Lunch dev server')
  .option({
    app: {
      alias: 'a',
      demandOption: true,
      describe: 'App name',
      type: 'string',
      requiresArg: true
    },
    mobile: {
      type: 'boolean'
    },
    testing: {
      type: 'boolean'
    }
  })
  .argv

const appName = argv.app
const config = require(path.resolve(__dirname, `../build/config/index`))(appName)
const appConfigPath = path.resolve(__dirname, '../app/' + appName + '/config.json')

var appConfig = require(appConfigPath)

if (argv.check) {
  appConfig = JSON.stringify(appConfig, null, 2)
  console.log(appConfig)
  return false
}

var argvKeys = Object.keys(argv)

argvKeys.forEach((item) => {
  if (item in appConfig) {
    appConfig = Object.assign(appConfig, {
      [item]: argv[item]
    })
  }
})

var appConfigContent = JSON.stringify(appConfig, null, 2)

fs.writeFile(appConfigPath, appConfigContent, function (err) {
  if (err) {
    return console.error(err)
  }
})