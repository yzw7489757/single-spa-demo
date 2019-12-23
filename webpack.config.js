const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
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
      'react',
      'react-dom',
      "vue",
      "vue-router",
      "svelte"
    ],
  },
  output: {
    publicPath: '/dist/',
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
        parser: { system: true }
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
        exclude: path.resolve(__dirname, '/index.html'),
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
    alias:{
      "@Vue": path.resolve('src/vue'),
      "@Ng": path.resolve('src/angular'),
      "@React": path.resolve('src/react'),
      svelte: path.resolve('node_modules', 'svelte'),
    },
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  optimization: {
    splitChunks: {
      name: 'common-dependencies.js',
    },
    
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    new ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, '../src')
    )
  ],
  
  devtool: 'source-map',
  externals: ['.ts','.js','.vue','.mjs', '.svelte'],
  devServer: {
    historyApiFallback: true
  }
};