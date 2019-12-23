const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
    'root-application': 'src/root-application/root-application.js',
    'common-dependencies': [
      // 只需要单一版本的情况则把它放在共同的依赖关系中
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
    ],
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.js?$/,
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
      "@Vue": path.resolve(__dirname + 'src/vue'),
      "@Ng": path.resolve(__dirname + 'src/angular'),
      "@React": path.resolve(__dirname + 'src/react'),
    }
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
  externals: ['.ts','.js','.vue'],
  devServer: {
    historyApiFallback: true
  }
};