const path = require('path')

const defaultProp = {
  appType: 'spa',
  assetRoot: './dist',
  assetPublicPath: '/',
  assetSubDirectory: 'static',
  apiUrl: '',
  hotPort: 5478,
  mockPort: 9478,
  serverPort: 5479
}

function changeDefaultProps(appConfig, defaultProp) {
  const appConfigKey = Object.keys(appConfig)
  const defaultConfigKey = Object.keys(defaultProp)
  const formatAppConfig = Object.assign({}, appConfig)

  defaultConfigKey.forEach((item, index) => {
    if (appConfig[item] === undefined) {
      Object.assign(formatAppConfig, {
        [item]: defaultProp[item]
      })
    }
  })

  return formatAppConfig
}

module.exports = function (appName, opt = {}) {
  const appConfigPath = path.resolve(__dirname, `../../app/${appName}/config.json`)
  const appConfig = require(appConfigPath)
  const formatAppConfig = Object.assign({}, appConfig)

  return changeDefaultProps(appConfig, defaultProp)
}