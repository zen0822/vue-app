/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const proxyMiddleware = require('http-proxy-middleware')
const fs = require('fs')

/**
 * 通过 entry 文件生成多应用的后端服务器 devServer 的视图
 */
function buildDevServerView(entryHub, appDir) {
  const appServerViewDir = `${appDir}/view`

  // 删除所有的文件(将所有文件夹置空)
  const emptyDir = function (fileUrl) {
    const files = fs.readdirSync(fileUrl)

    files.forEach(function (file) {
      const stats = fs.statSync(`${fileUrl}/${file}`)

      if (stats.isDirectory()) {
        emptyDir(`${fileUrl}/${file}`)
      } else {
        fs.unlinkSync(`${fileUrl}/${file}`)
      }
    })
  }

  emptyDir(appServerViewDir)

  entryHub.forEach((entryName) => {

  })
}

/**
 * 通过 entry 文件生成多应用的后端服务器 devServer 的路由
 */
function buildDevServerRoute(entryHub) {
  const router = express.Router()

  entryHub.forEach((entryName) => {
    router.get(`/${entryName}`, function (req, res, next) {
      res.render(entryName, {
        title: entryName
      })
    })
  })

  return router
}

module.exports = function (appName) {
  const appDir = path.resolve(__dirname, `../app/${appName}`)
  const config = require('./config')(appName)
  const proxyTable = config.dev.proxyTable
  const utils = require('./utils')(appName)

  const server = express()
  const devServerRouteCustom = require(`${appDir}/server/main`)
  const entryHub = utils.entryHub(
    path.resolve(__dirname, `${appDir}/client/entry`)
  )

  server.set('views', path.resolve(appDir, './view'))
  server.set('view engine', 'pug')

  server.use(favicon(path.resolve(appDir, './dist/favicon.ico')))
  server.use(logger('dev'))
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({
    extended: false
  }))
  server.use(cookieParser())
  server.use(express.static(path.resolve(appDir, './dist')))

  devServerRouteCustom(server)
  const devServerRoute = buildDevServerRoute(entryHub)
  server.use('/', devServerRoute)

  Object.keys(proxyTable).forEach((item) => {
    let options = proxyTable[item]

    if (typeof options === 'string') {
      options = {
        target: options
      }
    }

    server.use(item, proxyMiddleware(options))
  })

  server.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  if (server.get('env').NODE_ENV === 'development') {
    server.use(function (err, req, res, next) {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        error: err
      })
    })
  }

  server.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.status,
      error: {}
    })
  })

  server.listen(5479, function () {
    const port = 5479

    console.log(`Backend server listening at http://localhost:${port}`)
  })

  return server
}