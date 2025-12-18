const glob = require('glob') //用于匹配文件路径的模块
const path = require('path')
const { sep } = path
/**
 * middleware loader
 * @param {*} app Koa实例
 * 加载所有的middleware,可通过'app.middliewares.${目录}.${文件}'访问
 * 
 * 例子：
 *  app/middlieware
 *      |
 *      | --custom=module
 *          |
 *          |   -- custom-middlieware.js
 *  ==>app.middliewares.customModule.customMiddleware
 * 
 */
module.exports = (app) => {
    // 读取 app/middlieware/**/**.js 所有文件
    const middlewarePath = path.resolve(app.bussinessPath, `.${sep}middleware`)
    const fileList = glob.sync(path.resolve(middlewarePath, `.${sep}**${sep}**.js`))
    // 遍历所有文件目录，把内容加载到app.middlieware
    const middlewares = {}
    fileList.forEach(file => {
        // 提取文件名
        let name = path.resolve(file)
        // 截取路径 app/middlewares/custom-module/custom-middleware.js  ==>  custom-module/custom-middleware.js
        name = name.substring(name.lastIndexOf(`middlieware${sep}` + `middleware${sep}`.length, name.lastIndexOf('.')))
        // 把 - 改为驼峰，custom-module/custom-middleware.js ==> customModule.customMiddleware
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())
        // 挂载middlieware 到 app 中
        let tempMiddlieware = middlewares
        const names = name.split(sep)
        for (let i = 0; i < names.length; i++) {
            if (i == names.length - 1) {
                tempMiddlieware[names[i]] = require(path.resolve(file))(app)
            } else {
                if (!tempMiddlieware[names[i]]) tempMiddlieware[names[i]] = {}
                tempMiddlieware = tempMiddlieware[names[i]]
            }
        }
    });
    app.middlewares = middlewares
}