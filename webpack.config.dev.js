const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: [
    './client.js'
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      DISABLE_DEHYDRATOR: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
