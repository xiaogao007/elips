const glob = require('glob') //用于匹配文件路径的模块
const path = require('path')
const { sep } = path
/**
 * router-schema loader
 * @param {*} app koa 实例
 * 通过‘json-schema & ajv’对API规则进行约束，配合 api-params-verify 中间件使用
 * app/router-schema/**.js
 * 输出：
 *  app.routerSchema={
 *  '${api1}':${jsonSchema}, 
 *  '${api2}':${jsonSchema}, 
 *  '${api3}':${jsonSchema}, 
 *  '${api4}':${jsonSchema}, 
 *  '${api5}':${jsonSchema}, 
 *  }
 */
module.exports=(app)=>{
    // 读取 app/router-schema/**/**.js 所有文件
    const middlewarePath = path.resolve(app.bussinessPath, `.${sep}router-schema`)
    const fileList = glob.sync(path.resolve(middlewarePath, `.${sep}**${sep}**.js`))
    // 注册所有的 routerSchema使得可以 'app.routerSchema' 这样访问
    let routerSchema={}
    fileList.forEach(file => {
        routerSchema={
            ...routerSchema,
            ...require(path.resolve(file))
        }
    });
    app.routerSchema=routerSchema
}