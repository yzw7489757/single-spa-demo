const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProcessBar = require('webpackbar')
const HTMLPlugin = require('html-webpack-plugin')

const {
  name,
  version
} = require('./package.json')

const IS_PROD = process.argv.some(command => ~command.indexOf('production'))

module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? 'none' : 'source-map',
  entry: {
    'app': './index.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
    alias: {
      
    },
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'async', // 这里是我们修改的地方，async|initial|all 
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
  },

  plugins: [
    // IS_PROD && new CleanWebpackPlugin(['dist']),
    new ProcessBar({
      name,
      profile: true
    }),
    new HTMLPlugin({
      template: path.join(__dirname + '/index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(IS_PROD),
      VERSION: JSON.stringify(version),
      'process.env.NODE_ENV': JSON.stringify(IS_PROD ? "production" : "development")
    })
  ].filter(Boolean),
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
        "/react-app": {
            target: "http://localhost:5001",
            pathRewrite: {"^/react-app" : ""}
        },
        "/vue-app": {
            target: "http://localhost:5002",
            pathRewrite: {"^/vue-app" : ""}
        },
        "/svelte-app": {
            target: "http://localhost:5003",
            pathRewrite: {"^/svelte-app" : ""}
        },
        "/angular-app": {
            target: "http://localhost:5004",
            pathRewrite: {"^/angular-app" : ""}
        },
        "/nav-app": {
            target: "http://localhost:5005",
            pathRewrite: {"^/nav-app" : ""}
        },
        "/rts": {
            target: "http://localhost:5006",
            pathRewrite: {"^/rts" : ""}
        },
        "/vts": {
            target: "http://localhost:5007",
            // pathRewrite: {"^/vts" : ""}
        },
    }
  }
};