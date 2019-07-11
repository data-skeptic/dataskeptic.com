const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
if (!process || !process.env || !process.env['NODE_ENV'] || process.env['NODE_ENV'].indexOf('prod') === -1) require('dotenv').config();
console.log(process.env.NODE_ENV);

const env = {
  'process.env.NODE_ENV'              : JSON.stringify(process.env['NODE_ENV']),
  'process.env.BASE_API'              : JSON.stringify(process.env['BASE_API']),
  'process.env.AWS_ACCESS_KEY_ID'     : JSON.stringify(process.env['AWS_ACCESS_KEY_ID']),
  'process.env.AWS_SECRET_ACCESS_KEY' : JSON.stringify(process.env['AWS_SECRET_ACCESS_KEY']),
  'process.env.AWS_REGION'            : JSON.stringify(process.env['AWS_REGION']),
  'process.env.AWS_CONFIG_S3_BUCKET'  : JSON.stringify(process.env['AWS_CONFIG_S3_BUCKET'])
}

process.traceDeprecation = true

console.dir('CLIENT ENV!!')
console.dir(env)

module.exports = {
  entry: ['babel-polyfill', './client/index.jsx'],
  resolve: {
    modules: ['node_modules', 'shared'],
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loaders: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.less$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }) },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin(env),
    new ExtractTextPlugin({
      filename: 'main.css',
      disable: false,
      allChunks: true
    })
  ],
  node: {
    fs: 'empty'
  }
}
