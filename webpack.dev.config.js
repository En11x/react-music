import webpack from "webpack";

console.log('dev.config')

export default {
  // 开发环境推荐：
  // cheap-module-eval-source-map
  // 生产环境推荐：
  // cheap-module-source-map
  devtool: "cheap-module-eval-source-map",
  plugins:[
      //模块热替换  永远不要在生产环境(product)下启用
      //作用 只更新局部的更改
      new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
      contentBase:'./dist',  //输出目录
      historyApiFallback:true,  //所有404定位到index.html
      hot:true
  }
};
