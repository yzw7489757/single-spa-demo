const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  pages: {
    index: {
      entry: "src/app.ts",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page"
    }
  },
  publicPath: "/vts",
  outputDir: "/vts/dist",
  assetsDir: "/vts",
  filenameHashing: true,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
    port: 5008,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  runtimeCompiler: true,
  chainWebpack: config => {
    // config.plugins.delete("html");
    // config.plugins.delete("preload");
    // config.plugins.delete("prefetch");
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options =>
        Object.assign(options, { limit: 10240, publicPath: "/vts/" })
      );
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    optimization: {
      splitChunks: {
        name: "[name]",
        cacheGroups: {
          vendors: {
            chunks: "async",
            test: /[\\/]node_modules[\\/]/
          }
        }
      }
    },
    output: {
      chunkFilename: "[name].js",
      filename: "[name].js",
      libraryTarget: "umd",
      library: "vts"
    }
  }
};
