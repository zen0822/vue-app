module.exports = {
  type: 'spa',
  assetRoot: './dist',
  assetPublicPath: './',
  assetSubDirectory: 'static',
  api: '',
  apiProd: '',
  hotPort: 8080,
  mockPort: 3000,
  proxy: {
    '/api/**': `http://localhost:3000`
  }
}
