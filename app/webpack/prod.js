const webpack = require('webpack')
const webBaseConfig=require('./config/webpack.prod.js')
console.log(`\nbuilding... \n`)
webpack(webBaseConfig,(err,status)=>{
    if(err){
        console.log(err)
        return
    }
    process.stdout.write(`${status.toString({
        colors:true, // 在控制台输出色彩信息
        modules:false, // 不显示每个模块的打包信息
        children:false, // 不显示子编译任务信息
        chunks:false, // 不显示每个代码块信息 
        chunkModules:true // 显示代码中模块的信息
    })}`)
})