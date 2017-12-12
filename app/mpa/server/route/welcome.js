const express = require('express')
const router = express.Router()

const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

router.get('/welcome', function (req, res, next) {
  res.render('welcome', {
    title: 'Welcome'
  })
})

module.exports = router