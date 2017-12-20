#!/usr/bin/env node

process.env.NODE_ENV = 'development'

const argv = require('yargs')
  .usage('Usage: $0 --app [string]')
  .example('$0 --app example', 'Lunch dev server')
  .option('app', {
    alias: 'a',
    demandOption: true,
    describe: 'App name',
    type: 'string',
    requiresArg: true
  })
  .argv

require('../build/mock')(argv.app)
