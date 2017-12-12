const express = require('express')

/* GET home page. */

module.exports = function (server) {
  const routeWelcome = require('./route/welcome')

  server.use('/', routeWelcome)
}