// 本地开发启动 devServer
const express=require('express')
const path =require('path')
const consoler=require('consoler')
const webpack =require('webpack')
const devMiddleware=require('webpack-dev-middleware')
const hotMiddleware=require('webpack-hot-middleware')


const {
    webpackConfig,
    DEV_SERVER_CONFIG
}=require('./config/webpack.dev.js')

const app =express()

const compiler = webpack(webpackConfig)

// 指定静态文件目录
app.use(express.static(path.join(__dirname,'../public/dist')))
// 引入 devMiddleware (监控文件改动)
app.use(devMiddleware(compiler,{
    // 落地文件
    writeToDisk:(filePath)=>filePath.endsWith('.tpl'),
    // 资源路径
    publicPath:webpackConfig.output.publicPath,
    // headers配置
    headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers':'X-Requested-With,content-type,Authorization'
    },
    stats:{
        colors:true
    }
}))
// 引入 hotMiddleware (实现热更新驱动)
app.use(hotMiddleware(compiler,{
    path:`/${DEV_SERVER_CONFIG.HMR_PATH}`,
    log:()=>{}
}))

consoler.info('请等待webpack初次构建完成提示')

const port = DEV_SERVER_CONFIG.PORT
// 启动devServer
app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})