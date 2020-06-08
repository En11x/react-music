import path from "path";

//生成html文件
import HtmlWebpackPlugin from "html-webpack-plugin";
//生成独立的CSS文件
import MiniCssExtractPlugin from "mini-css-extract-plugin";

//js优化压缩
import TerserPlugin from 'terser-webpack-plugin'

console.log("base.config.js");

export default (env, argv) => {
  const config = {
    entry: "./src/index.tsx",
    output: {
      filename:
        argv.mode === "production"
          ? "[name].[chunkhash:8].js"
          : "[name].[hash:8].js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: {
            loader: "babel-loader",
            options: {},
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          include: /node_modules/, // 匹配node_modules里面的css文件
        },
        {
          test: /\.module\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                import: true, //可以使用@import
                modules: {
                  //默认启用了CSS module
                  // local 类名  局部的
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                },
                importLoaders: 1, //之前的loaders
              },
            },
            //自动添加前缀
            "postcss-loader",
          ],
          include: /src/, //匹配src目录下的css文件
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|ico|woff|woff2|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        //模板
        template: path.resolve(__dirname, "src/index.html"),
        favicon: path.resolve(__dirname, "favicon.ico"),
      }),
      //单独生成css文件
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
      }),
    ],

    //优化
    optimization:{
        //允许通过提供一个或多个定制过的terser  plugin实例，覆盖默认压缩工具（minimizer）
        minimizer:[
            new TerserPlugin({
                parallel:true, //启用多进程并行运行
                cache:true    //启用文件缓存
            })
        ]
    }
  };
  return config;
};
