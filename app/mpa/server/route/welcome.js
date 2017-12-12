const express = require('express')
const router = express.Router()

router.get('/welcome', function (req, res, next) {
  res.render('welcome', {
    title: 'Welcome'
  })
})

module.exports = router