const HtmlWebpackPlugin = require('html-webpack-plugin');

class AutoInjectPlugin {
  constructor(options) {
    this.options = options;
  }

  apply (compiler) {
    let _this = this;
    compiler.hooks.compilation.tap('AutoInjectPlugin', (compilation) => {

      // Static Plugin interface |compilation |HOOK NAME | register listener 
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'AutoInjectPlugin', // <-- Set a meaningful name here for stacktraces
        (htmlPluginData, cb) => {
          let { scripts = [], styles = [] } = this.options

          htmlPluginData.assets.js = [].concat(
            scripts,
            htmlPluginData.assets.js
          );

          htmlPluginData.assets.css = [].concat(
            styles,
            htmlPluginData.assets.css
          );
          cb(null, htmlPluginData)
        }
      )
    })
  }
}

module.exports = AutoInjectPlugin
