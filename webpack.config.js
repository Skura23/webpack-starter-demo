const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
    path: path.resolve(__dirname, 'dist'),
    //输出的文件名 [name]为原文件名
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '陈学辉',
      template: './src/template.html',
      // 打包后的html文件名
      filename: 'index.html',
      hash: true
    })
  ],
  devServer: {
    host: 'localhost', //服务器的ip地址
    port: 1573, //端口
    open: true //自动打开页面
  }
}