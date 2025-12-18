const Koa = require('koa')
const path = require('path')
const { sep } = path //兼容不同操作系统的斜杠/
const env = require('./env')

const middlewareLoader = require('./loader/middleware')
const routerSchemaLoader = require('./loader/router-schema')
const controllerLoader = require('./loader/controller')
const routerLoader = require('./loader/router')
const serviceLoader = require('./loader/service')
const extendLoader = require('./loader/extend')
const configLoader = require('./loader/config')

module.exports = {
    // 启动项目 
    // @params options项目配置
    start(options = {}) {
        // 创建实例
        const app = new Koa()
        // 应用配置
        app.options = options
        // 基础路径
        app.baseDir = process.cwd()
        // 业务文件路径
        app.bussinessPath = path.resolve(app.baseDir, `.${sep}app`) // .${sep}app == ./app
        // 应用环境配置
        app.env = env()
        console.log("🚀 ~ app.env:", app.env.get())
        
        // 加载loader
        middlewareLoader(app)
        routerSchemaLoader(app)
        controllerLoader(app)
        serviceLoader(app)
        configLoader(app)
        extendLoader(app)
        // 注册全局中间件
        try{
            require(`${app.bussinessPath}${sep}middleware.js`)(app)
        }catch(e){
            console.log('[exception] there is no global middleware file');
        }
        routerLoader(app)
        
        // 启动服务
        try {
            const port = process.env.PORT || 8080
            const host = process.env.IP || '0.0.0.0'
            app.listen(port, host)
            console.log(`Server is Running on port:${port}`);
        } catch (e) {
            console.error(e);
        }
    }
}