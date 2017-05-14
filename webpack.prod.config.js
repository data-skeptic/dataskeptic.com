var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractLESS = new ExtractTextPlugin('[name].css');

module.exports = {
    entry: [
        './client'
    ],
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
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader'},
            {test: /\.less$/i, loader: extractLESS.extract(['css', 'less'])},
            {test: /\.json$/, loader: "json"}
        ]
    },
    plugins: [
        extractLESS,

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
};
