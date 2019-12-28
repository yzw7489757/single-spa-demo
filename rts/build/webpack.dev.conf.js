const merge = require('node_modules/webpack-merge/lib')
const webpack = require('node_modules/@types/webpack')
const baseConfig = require('./webpack.base.conf')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path')
const {resolve} =require('./utils')

const devConfig = merge(baseConfig, {
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    quiet: true, // 关闭webpack自带提示
    port: 5006,
    overlay: {
      warnings: false,
      errors: true
    }, // 出现编译error时，全屏覆盖显示
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    clientLogLevel: 'warning',
  },
  resolve:{
    alias:{
      '@Types':resolve('./types'),
      assets:resolve('./src/assets')
    }
  },
})

module.exports = devConfig