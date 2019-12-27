const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
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
    'app': './src/app.js',
    // 只需要单一版本的情况则把它放在共同的依赖关系中
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'angular'
  },
  module: {
    rules: [
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
          publicPath: '/vue-app/',
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
      "@": path.resolve('src'),
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
  externals: ['.ts', '.js', '.mjs'],
  devServer: {
    historyApiFallback: true
  }
};