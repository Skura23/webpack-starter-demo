const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: {
    index: './src/js/index.js',
    one: './src/js/1.js',
    two: './src/js/2.js',
  },
  output: {
    //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
    path: path.resolve(__dirname, 'dist'),
    //输出的文件名 [name]为entry键名, 如 one two
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test1',
      template: './src/template.html',
      chunks: ['one'],
      //是否为引入的js文件添加hash值
      // hash:true,    
      //script标签的位置，true/body为在</body>标签前，head为在<head>里，false表示页面不引入js文件
      inject: true,
      // 打包后的html文件名
      filename: 'index1.html'
    }),
    new HtmlWebpackPlugin({
      title: 'test2',
      template: './src/template.html',
      //页面里要引入的js文件，值对应的是entry里的key。省略参数会把entry里所有文件都引入
      chunks: ['two'],
      // 打包后的html文件名
      filename: 'index2.html'
    }),
    // 未设定chunks属性则默认引入全部chuncks
    new HtmlWebpackPlugin({
      title: 'index',
      template: './src/template.html',
      // 打包后的html文件名
      filename: 'index.html'
    }),
    //引入热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // 指生成css文件夹, 文件在此文件夹内; 文件目录会放入output.path里
      filename: 'css/[name].css'
    })
  ],
  module: {
    rules: [
      // 将css样式以style标签形式插入到html内
      // {
      //   //以点开始css结尾的文件
      //   test:/\.css$/,  
      //   //顺序不能搞错
      //   use:['style-loader','css-loader']   
      // },
      // 将css样式插入到新css文件内
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 这个表示在css文件里但凡用到地址的地方在其前面加个目录'../'，即公共地址, 这个是为了能找到图片
            // 如果不设置, 则背景图地址为 url(xxx.png)
            publicPath: '../'
          }
        }, "css-loader"] //代替style-loader
      },
      {
        test: /\.less$/,
        use: [ //把less编译到css文件里
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader', //注意顺序
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/, //找到三种格式中的任意一种
        // use:['file-loader']
        use: [{
          loader: 'url-loader', //把图片转成base64
          options: {
            //小于50k就会转成base64
            limit: 50 * 1024,
            outputPath: 'images'
          }
        }]
        //use:'url-loader?limit=50000&outputPath=images'    //loader的另一种写法，与get请求方式相同
      },
      // 用于解决html文件内的img load问题
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            // 指定哪些属性标签供loader处理
            attrs: ['img:src', 'link:href'],
            minimize: true
          }
        }
      },
      // babel js loader
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { //env针对的是ES的版本，它会自动选择。react针对的就是react
            presets: ['env']
          }
        }],
        //不去检查node_modules里的内容，那里的js太多了，会非常慢
        exclude: /node_modules/,
        //直接规定查找的范围
        include: path.resolve(__dirname, 'src/js'),
      }
    ]
  },
  devServer: {
    host: 'localhost', //服务器的ip地址
    port: 1573, //端口
    open: true, //自动打开页面
    // hrm(无刷新) Live-reloading(刷新)
    // hot:true
  }
}