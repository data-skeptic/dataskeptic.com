var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractLESS = new ExtractTextPlugin('[name].css')

var dotenv = require('dotenv').config({ path: __dirname + '/.env' })

module.exports = {
  entry: ['babel-polyfill', './client'],
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.less$/i, loader: extractLESS.extract(['css', 'less']) },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    extractLESS,

    // expose only secure variables to the client  
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(dotenv.parsed['NODE_ENV']),
      'process.env.BASE_API': JSON.stringify(dotenv.parsed['BASE_API']),
      'process.env.AWS_ACCESS_KEY_ID': JSON.stringify(dotenv.parsed['AWS_ACCESS_KEY_ID']),
      'process.env.AWS_SECRET_ACCESS_KEY': JSON.stringify(dotenv.parsed['AWS_SECRET_ACCESS_KEY']),
      'process.env.AWS_REGION': JSON.stringify(dotenv.parsed['AWS_REGION']),
      'process.env.AWS_CONFIG_S3_BUCKET': JSON.stringify(dotenv.parsed['AWS_CONFIG_S3_BUCKET']),
    }),
    //
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  node: {
    fs: 'empty'
  }
}
