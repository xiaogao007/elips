const webpack =require('webpack')
const path = require('path')
const merge = require('webpack-merge')

// 基类配置
const baseConfig = require('./webpack.base')


// devserver配置
const DEV_SERVER_CONFIG={
    HOST:'127.0.0.1',
    PORT:9002,
    HMR_PATH:'__webpack_hmr',
    TIMEOUT:20000
}

// 开发阶段 entry 配置加入 hmr
Object.keys(baseConfig.entry).forEach(v=>{
    // 第三方包不作为hmr入口
    if(v!=='vendor'){
        baseConfig.entry[v]=[
            // 主入口文件
            baseConfig.entry[v],
            // hmr 更新入口，官方指定的 hrm 路径
            `webpack-hot-middleware/client?path=http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/${DEV_SERVER_CONFIG.HMR_PATH}?timeout=${DEV_SERVER_CONFIG.TIMEOUT}&reload=true`
        ]
    }
})

// 配置
const webpackConfig = merge.smart(baseConfig, {
    mode: 'development',
    // source-map 开发工具呈现代码的映射关系，便于开发工具调试
    devtool:'eval-cheap-module-source-map',
    output: {
        filename: 'js/[name]_[chunkhash:8].bundle.js',
        path:path.resolve(process.cwd(),'./app/public/dist/dev/'),//输出文件存储路径
        publicPath: `http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/public/dist/dev/`, // 外部资源公共路径
        globalObject:'this'
    },
    // 开发阶段插件
    plugins:[
        // HotModuleReplacementPlugin 用于实现热模块替换 简称 HMR
        // 模块热替换用于在应用运行时替换模块
        // 极大的提升开发效率，使应用一直一直保持运行状态
        new webpack.HotModuleReplacementPlugin({
            multiStep:false
        })
    ]
})
module.exports = {
    // webpack配置
    webpackConfig,
    // devServer配置，暴露给dev.js使用
    DEV_SERVER_CONFIG
}