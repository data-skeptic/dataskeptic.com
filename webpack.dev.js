import webpack from 'webpack'
import assign from 'object-assign'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import prodCfg from './webpack.prod.config.js'
import hot from './hot'

const DotenvPlugin = require('webpack-dotenv-plugin')

Object.assign = assign

export default function(app) {
  const config = Object.assign(prodCfg, {
    devtool: 'inline-source-map',
    entry: ['babel-polyfill', 'webpack-hot-middleware/client', './client'],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader?cacheDirectory=true'
          }
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new DotenvPlugin({
        sample: './.env.example',
        path: './.env'
      }),

      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  })

  hot(app, config)
}
