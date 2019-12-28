const HtmlWebpackPlugin = require('html-webpack-plugin');
const IS_PROD = process.env.NODE_ENV === 'production';
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const resolve = dir => path.resolve(__dirname, '../', dir);
const os = require('os');

const getAnalyzerPlugin = () => { // 打包分析
  return process.argv.includes('--report')?[new BundleAnalyzerPlugin()]:[] 
 };

const htmlPlugins = () => {
  const template = resolve('public/index.html')
  let minify = {
    removeComments: true,// 注释
    collapseWhitespace: true, // 缩减文本空白
    removeAttributeQuotes: true, // 属性双引号
    removeEmptyAttributes: true // 所有空属性值
  }
  return [
    new HtmlWebpackPlugin({
      template,
      inject:true,
      chunksSortMode:'none', // 不对插入的js进行排序 
      ...(IS_PROD?minify:{})
    })
  ]
}


// DLL 获取 deps
const { dependencies } = require('../package.json');
const vendors = Object.keys(dependencies);// dll
const excludeVendors = []; // 不打包进 vendor 的依赖

excludeVendors.forEach((dep) => {
  const index = vendors.indexOf(dep);
  if (index > -1) {
    vendors.splice(index, 1);
  }
});

function getIPAdress() {
  // 获取本地ip 开启局域网访问
  let useAddress;
  const interfaces = os.networkInterfaces();
  Object.keys(interfaces).forEach((key) => {
    const iface = interfaces[key].filter(alias => alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)[0];
    if (iface) {
      useAddress = iface.address;
    }
  });
  return useAddress;
}

module.exports =  {
  resolve,
  getIp:getIPAdress,
  htmlPlugins,
  vendors,
  IS_PROD,
  getAnalyzerPlugin:getAnalyzerPlugin
}