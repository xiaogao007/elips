const glob = require('glob') //用于匹配文件路径的模块
const path = require('path')
const { sep } = path
/**
 * controller loader
 * @param {*} app Koa实例
 * 加载所有的controller,可通过'app.controller.${目录}.${文件}'访问
 * 
 * 例子：
 *  app/controller
 *      |
 *      | --custom=module
 *          |
 *          |   -- custom-controller.js
 *  ==>app.controller.customModule.customController
 * 
 */
module.exports = (app) => {
    // 读取 app/controller/**/**.js 所有文件
    const controllerPath = path.resolve(app.bussinessPath, `.${sep}controller`)
    const fileList = glob.sync(path.resolve(controllerPath, `.${sep}**${sep}**.js`))
    // 遍历所有文件目录，把内容加载到app.controller
    const controller = {}
    fileList.forEach(file => {
        // 提取文件名
        let name = path.resolve(file)
        // 截取路径 app/controller/custom-module/custom-controller.js  ==>  custom-module/custom-controller.js
        name = name.substring(name.lastIndexOf(`controller${sep}`) + `controller${sep}`.length, name.lastIndexOf('.'))
        // 把 - 改为驼峰，custom-module/custom-controller.js ==> customModule.customController
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())
        // 挂载controller 到 app 中
        let tempController = controller
        const names = name.split(sep) // [ customModule (目录), customcController (文件)]
        for (let i = 0; i < names.length; ++i) {
            if (i === names.length - 1) {
                const ControllerModule = require(path.resolve(file))(app)
                tempController[names[i]] = new ControllerModule()
            } else {
                if (!tempController[names[i]]) {
                    tempController[names[i]] = {}
                }
                tempController = tempController[names[i]]
            }
        }
    });
    console.log("🚀 ~ controller:", controller)
    app.controller = controller
}