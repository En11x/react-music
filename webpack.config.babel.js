import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.js'
import devConfig from './webpack.dev.config.js'


console.log('babel.js')
export default (env,argv)=>{
    let config = argv.mode === 'development'?devConfig:''
    return merge(baseConfig(env,argv),config)
}