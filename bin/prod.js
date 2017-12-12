#!/usr/bin/env node
process.env.NODE_ENV = 'production'

const optimist = require('optimist')

const argv = optimist.argv

if (!argv.app) {
  console.warn('argv app must alive')

  return false
}

require('../build/prod')(argv.app)
