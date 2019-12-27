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
    library: 'svelte'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.(html|svelte)$/,
        exclude: path.resolve('index.html'),
        use: {
          loader: 'svelte-loader',
          options: {
            hotReload: true
          }
        }
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
          name: '[name].[ext]?[hash:8]',
          publicPath: '/svelte-app/',
        }
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
      svelte: path.resolve('node_modules', 'svelte'),
      '@':path.resolve(__dirname + '/src')
    },
    mainFields: ['svelte', 'browser', 'module', 'main']
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
  externals: ['.js', '.svelte'],
  devServer: {
    historyApiFallback: true
  }
};