const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const env = {
  'process.env.NODE_ENV': JSON.stringify(process.env['NODE_ENV']),
  'process.env.BASE_API': JSON.stringify(process.env['BASE_API']),
  'process.env.AWS_ACCESS_KEY_ID': JSON.stringify(
    process.env['AWS_ACCESS_KEY_ID']
  ),
  'process.env.AWS_SECRET_ACCESS_KEY': JSON.stringify(
    process.env['AWS_SECRET_ACCESS_KEY']
  ),
  'process.env.AWS_REGION': JSON.stringify(process.env['AWS_REGION']),
  'process.env.AWS_CONFIG_S3_BUCKET': JSON.stringify(
    process.env['AWS_CONFIG_S3_BUCKET']
  )
}

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
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),

    new webpack.DefinePlugin(env),

    new webpack.optimize.UglifyJsPlugin({
      test: /\.js($|\?)/i,
      parallel: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
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
