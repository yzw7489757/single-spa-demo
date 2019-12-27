const path = require('path');
const webpack = require('webpack');
const ProcessBar = require('webpackbar')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {
  name,
  version
} = require('./package.json')
const IS_PROD = process.argv.some(command => ~command.indexOf('production'))

module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? 'none' : 'source-map',
  entry: {
    'app': './src/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'nav'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          publicPath: '/nav-app/',
        }
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname + '/src')
    },
    extensions: [
      ".js", ".jsx"
    ],
    modules: [
      __dirname,
      'node_modules',
    ],
  },


  plugins: [
    IS_PROD && new CleanWebpackPlugin(['dist']),
    new ProcessBar({
      name,
      profile: true
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(IS_PROD),
      VERSION: JSON.stringify(version),
      'process.env.NODE_ENV': JSON.stringify(IS_PROD ? "production" : "development")
    })
  ].filter(Boolean),
  devServer: {
    historyApiFallback: true
  }
};