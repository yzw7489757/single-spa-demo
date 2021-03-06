const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProcessBar = require('webpackbar')
const HTMLPlugin = require('html-webpack-plugin')

const IS_PROD = process.argv.some(command => ~command.indexOf('production'))

const resolve = (filePath) => path.resolve(filePath)
module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? 'none' : 'source-map',
  entry: {
    'baseApplication': 'src/baseApplication/index.js',
    // 只需要单一版本的情况则把它放在共同的依赖关系中
    'common-dependencies': [
      'core-js/client/shim.min.js',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      'reflect-metadata',
      "vue",
      "vue-router",
      "svelte",
      "svelte-routing",
      "react", "react-dom", "react-router", "react-router-dom"
    ],
  },
  output: {
    publicPath: '/dist/',
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /[\/\\]@angular[\/\\].+\.js$/,
        parser: {
          system: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/vue'),
        use: [
          'vue-style-loader',
          'css-loader'
        ]
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
        exclude: path.resolve(__dirname, 'src/vue'),
        use: [
          'style-loader',
          'css-loader'
        ]
      }
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
      "@Vue": path.resolve('src/vue'),
      "@Ng": path.resolve('src/angular'),
      "@React": path.resolve('src/react'),
      svelte: path.resolve('node_modules', 'svelte'),
    },
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  optimization: {
    splitChunks: {
      name: 'common-dependencies.js', // 将依赖分块
      // cacheGroups: {
      //   vendors: {
      //     chunks: 'async', // 这里是我们修改的地方，async|initial|all 
      //     test: /[\\/]node_modules[\\/]/
      //   } 
      // }
    },
  },

  plugins: [
    IS_PROD && new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    new ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, '../src')
    ),
    new ProcessBar({
      name: require('./package.json').name,
      profile: true
    }),
    new HTMLPlugin({
      template: path.join(__dirname + '/index.html'),
      inject: 'body'
    })
  ].filter(Boolean),
  externals: ['.ts', '.js', '.vue', '.mjs', '.svelte'],
  devServer: {
    historyApiFallback: true
  }
};