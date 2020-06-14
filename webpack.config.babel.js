import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.js'
import devConfig from './webpack.dev.config.js'
import prodConfig from './webpack.prod.config'


console.log('babel.js')
export default (env,argv)=>{
    let config = argv.mode === 'development'?devConfig:prodConfig
    return merge(baseConfig(env,argv),config)
}