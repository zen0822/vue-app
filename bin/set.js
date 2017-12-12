#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const optimist = require('optimist')
var argv = optimist.boolean(['mobile', 'testing']).argv

if (!argv.app) {
    console.error('fatal: argv -app is undefined!')

    return false
}

const appName = argv.app
const config = require(path.resolve(__dirname, `./index`))(appName)
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

var appConfigContent = JSON.stringify(appConfig, null, 4)

fs.writeFile(appConfigPath, appConfigContent, function (err) {
    if (err) {
        return console.error(err)
    }
})
