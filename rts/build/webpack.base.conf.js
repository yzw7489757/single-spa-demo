const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

const {
  resolve,
  htmlPlugins,
  IS_PROD,
} = require('./utils');
const env = require('./env')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
}); // 启动多线程打包

const { name } = require('../package.json')
const combination = process.env.NODE_TYPE  === 'single-spa'
const lessStyleLoader = IS_PROD ? MiniCssExtractPlugin.loader : "style-loader"

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: ['react-hot-loader/patch', combination? './src/app.js':'./src/index.tsx']
  },
  output: {
    path: resolve('dist'),
    // filename: 'js/[name].[hash].js',
    // chunkFilename: 'js/[name].bundle.js',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ts-react'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'Happypack/loader?id=HappyBabel'
          },
          {
            loader: 'react-hot-loader/webpack',
            options: {
              babelrc: true,
              plugins: ['react-hot-loader/babel'],
            }
          },
          {
            loader: 'awesome-typescript-loader',
          }
        ]
      },
      {
        test: /\.module\.(le|c)ss$/,
        use: [
          lessStyleLoader,
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              localIdentName: "[local]_[hash:base64:5]"
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /.(le|c)ss$/, // 非模块化
        exclude:/\.module\.(le|c)ss$/,
        use: [
          lessStyleLoader, 
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:7].[ext]',
          publicPath: '/rts/',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:5].min.[ext]',
          limit: 5000,
          publicPath: '/rts/fonts/',
          outputPath: '/rts/fonts/'
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new HappyPack({
      id: 'HappyBabel',
      use: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new WebpackBar({
      profile: true,
      name,
    }),
    new WebpackBuildNotifierPlugin({
      title: name + IS_PROD?' Build':' startup is Running',
      logo: path.resolve("../public/favicon.png"),
      suppressSuccess: "initial"
    }),
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ])
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js','.d.ts', ".json", '.less'],
    alias: {
      'react-dom': resolve('./node_modules/@hot-loader/react-dom'),
    }
  },

};