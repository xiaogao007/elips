const path=require('path')

module.exports=(app)=>{
    // 引入异常捕获中间件（必须第一个注册，才能捕获所有后续中间件的异常）
    app.use(app.middlewares.errorHandler)

    // 配置静态根目录
    const KoaStatic=require('koa-static')
    app.use(KoaStatic(path.resolve(process.cwd(), './app/public')));
    
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
    // 引入ctx.body 解析中间件
    const bodyParser=require('koa-bodyparser')
    app.use(bodyParser({
        formLimit:'1000mb',
        enableTypes:['form','json','text']
    }))

    // 引入 API 签名校验中间件
    app.use(app.middlewares.apiSignVerify)
    // 引入 API 参数校验中间件
    app.use(app.middlewares.apiParamsVerify)
    // 引入项目处理中间件
    app.use(app.middlewares.projectHandler)
}