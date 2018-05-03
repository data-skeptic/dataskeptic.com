const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const dotenv = require('dotenv').config({ path: __dirname + '/.env' })

module.exports = {
  entry: ['babel-polyfill', './client'],
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
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(dotenv.parsed['NODE_ENV']),
      'process.env.BASE_API': JSON.stringify(dotenv.parsed['BASE_API']),
      'process.env.AWS_ACCESS_KEY_ID': JSON.stringify(dotenv.parsed['AWS_ACCESS_KEY_ID']),
      'process.env.AWS_SECRET_ACCESS_KEY': JSON.stringify(dotenv.parsed['AWS_SECRET_ACCESS_KEY']),
      'process.env.AWS_REGION': JSON.stringify(dotenv.parsed['AWS_REGION']),
      'process.env.AWS_CONFIG_S3_BUCKET': JSON.stringify(dotenv.parsed['AWS_CONFIG_S3_BUCKET']),
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

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
