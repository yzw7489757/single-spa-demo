const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const ProcessBar = require('webpackbar')
const {
  name,
  version
} = require('./package.json')
const IS_PROD = process.argv.some(command => ~command.indexOf('production'))

module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? 'none' : 'source-map',
  entry: {
    'app': 'src/app.js',
  },
  output: {
    // publicPath: '/dist/',
    // chunkFilename: '[name].bundle.js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'vue'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader:'css-loader',
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash:8]',
          publicPath: '/vue-app/',
        }
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@':path.resolve(__dirname + '/src')
    },
    extensions: [
      ".js", ".vue"
    ],
    modules: [
      __dirname,
      'node_modules',
    ],
  },


  plugins: [
    // IS_PROD && new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
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
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
};