const KoaRouter = require('koa-router')
const glob = require('glob')
const path = require('path')
const { sep } = path
/**
 * router loader
 * @param {*} app koa 实例
 * 解析所有 app/router/ 所有js文件 加载到KoaRouter下
 */
module.exports = (app) => {
    // 找到路由文件路径
    const routerPath = path.resolve(app.bussinessPath, `.${sep}router`)
    // 实例化KoaRouter
    const router = new KoaRouter()
    // 注册所有路由
    const fileList = glob.sync(path.resolve(routerPath, `.${sep}**${sep}**.js`))
    fileList.forEach(file => {
        require(path.resolve(file))(app, router)
    });
    // 路由兜底（代码健壮性）
    router.get('*', async (ctx, next) => {
        ctx.status = 302 //临时重定向
        ctx.redirect(`${app?.options?.homePage ?? '/'}`)
    })
    // 路由注册到app上
    app.use(router.routes())
    app.use(router.allowedMethods())
}