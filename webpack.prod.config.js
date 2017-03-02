var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['', '.js', '.jsx']
  },
  output: {
    path:       path.join(__dirname, 'public'),
    filename:   'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
          test: /\.less$/,
          loader: "style!css!less?strictMath&noIeCompat"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
