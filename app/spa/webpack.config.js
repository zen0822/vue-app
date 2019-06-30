module.exports = {
  loaderRule: [{
    test: /blog-[\w\W]+.html$/,
    use: [
      'extract-loader',
      'html-loader',
      {
        loader: 'file-loader',
        options: {
          name: 'static/[name].[ext]',
          publicPath: './'
        }
      }
    ]
  }]
}
