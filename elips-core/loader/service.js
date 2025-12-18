const glob = require('glob') //用于匹配文件路径的模块
const path = require('path')
const { sep } = path
/**
 * service loader
 * @param {*} app Koa实例
 * 加载所有的service,可通过'app.service.${目录}.${文件}'访问
 * 
 * 例子：
 *  app/service
 *      |
 *      | --custom=module
 *          |
 *          |   -- custom-service.js
 *  ==>app.service.customModule.customService
 * 
 */
module.exports = (app) => {
    // 读取 app/service/**/**.js 所有文件
    const servicePath = path.resolve(app.bussinessPath, `.${sep}service`)
    const fileList = glob.sync(path.resolve(servicePath, `.${sep}**${sep}**.js`))
    // 遍历所有文件目录，把内容加载到app.service
    const service = {}
    fileList.forEach(file => {
        // 提取文件名
        let name = path.resolve(file)
        // 截取路径 app/service/custom-module/custom-service.js  ==>  custom-module/custom-service.js
        name = name.substring(name.lastIndexOf(`service${sep}` + `service${sep}`.length, name.lastIndexOf('.')))
        // 把 - 改为驼峰，custom-module/custom-service.js ==> customModule.customService
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())
        // 挂载service 到 app 中
        let tempService = service
        const names = name.split(sep) // [ customModule (目录), customcService (文件)]
        for (let i = 0; i < names.length; i++) {
            if (i == names.length - 1) {
                const ServiceModule=require(path.resolve(file))(app)
                tempService[names[i]] = new ServiceModule()
            } else {
                if (!tempService[names[i]]) tempService[names[i]] = {}
                tempService = tempService[names[i]]
            }
        }
    });
    app.service = service
}