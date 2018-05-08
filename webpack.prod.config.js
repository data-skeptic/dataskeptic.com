var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractLESS = new ExtractTextPlugin('[name].css')

const env = {
  'process.env.NODE_ENV': JSON.stringify(process.env['NODE_ENV']),
  'process.env.BASE_API': JSON.stringify(process.env['BASE_API']),
  'process.env.AWS_ACCESS_KEY_ID': JSON.stringify(process.env['AWS_ACCESS_KEY_ID']),
  'process.env.AWS_SECRET_ACCESS_KEY': JSON.stringify(process.env['AWS_SECRET_ACCESS_KEY']),
  'process.env.AWS_REGION': JSON.stringify(process.env['AWS_REGION']),
  'process.env.AWS_CONFIG_S3_BUCKET': JSON.stringify(process.env['AWS_CONFIG_S3_BUCKET']),
}

console.dir(env)

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

    new webpack.DefinePlugin(env),

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
