const path=require('path')

module.exports=(app)=>{
    // 模板渲染引擎
    const koaNumjucks = require('koa-nunjucks-2')
    app.use(koaNumjucks({
        ext:'tpl',
        path:path.resolve(process.cwd(),'./app/public'),
        nunjucksConfig:{
            noCache:true,
            trimBlocks:true
        }
    }))
}