import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import cssnano from 'cssnano'

console.log('prod.config.js')

export default{
    plugins:[
        //清除打包文件
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/\.css$/g,   //压缩css文件
            cssProcessor:cssnano   //使用cssnano配置
        })
    ]
}