const glob = require('glob') //用于匹配文件路径的模块
const path = require('path')
const { sep } = path
/**
 * extend loader
 * @param {*} app Koa实例
 * 加载所有的extend,可通过'app.extend.${目录}.${文件}'访问
 * 
 * 例子：
 *  app/extend
*      |
*      |   -- custom-extend.js
 *  ==>app.extend.customExtend
 * 
 */
module.exports = (app) => {
    // 读取 app/extend/**.js 所有文件
    const extendPath = path.resolve(app.bussinessPath, `.${sep}extend`)
    const fileList = glob.sync(path.resolve(extendPath, `.${sep}**${sep}**.js`))
    // 遍历所有文件目录，把内容加载到app.extend
    fileList.forEach(file => {
        // 提取文件名
        let name = path.resolve(file)
        // 截取路径 app/extend/custom-extend.js  ==>  custom-extend.js
        name = name.substring(name.lastIndexOf(`extend${sep}`) + `extend${sep}`.length, name.lastIndexOf('.'))
        // 把 - 改为驼峰，custom-extend.js ==> customExtend
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())
        for (const key in app) {
            if(key === name){
                console.log(`[extend] load error name:${name} is already in app`);
                return
            }
        }
        //    挂载
        app[name] = require(path.resolve(file))(app)
    });
}