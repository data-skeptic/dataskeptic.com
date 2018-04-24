import webpack from 'webpack'
import assign from 'object-assign'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import prodCfg from './webpack.prod.config.js'

const DotenvPlugin = require('webpack-dotenv-plugin')

Object.assign = assign

const BABEL_QUERY = {
  presets: ['react', 'es2015', 'stage-0'],
  plugins: [
    ['transform-object-rest-spread'],
    ['transform-class-properties'],
    ['transform-decorators-legacy'],
    [
      'react-transform',
      {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }
        ]
      }
    ]
  ]
}

export default function(app) {
  const config = Object.assign(prodCfg, {
    devtool: 'inline-source-map',
    entry: ['babel-polyfill', 'webpack-hot-middleware/client', './client'],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: BABEL_QUERY
        },
        {
          test: /\.less$/,
          loader: 'style!css!less?strictMath&noIeCompat'
        },
        {
          test: /\.json$/,
          loader: 'json'
        }
      ]
    },
    plugins: [
      new DotenvPlugin({
        sample: './.env.example',
        path: './.env'
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  })

  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, { noInfo: true }))
  app.use(webpackHotMiddleware(compiler))
}
