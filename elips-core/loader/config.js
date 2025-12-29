const path = require('path')
const { sep } = path
/**
 * config loader
 * @param {*} app Koa 实例
 * 
 * 配置区分 本地/测试/生产 通过 env 环境读取不同文件配置 env.config
 * 通过 env.config 覆盖 default.config 加载到app.config
 * 
 * 默认配置 config/config.default.config
 * 本地配置 config/config.local.config
 * 测试配置 config/config.beta.config
 * 生成配置 config/config.prod.config
 */
module.exports = (app) => {
    // 找到config/ 目录
    const configPath = path.resolve(app.baseDir, `.${sep}config`)
    // 获取default.config
    let defaultConfig = {}
    try {
        defaultConfig = require(path.resolve(configPath, `.${sep}config.default.js`))
    } catch (e) {
        console.log('[exception] failed to load default.config file:', e.message);
        console.log('Error details:', e.stack);
    }

    // 获取env.config
    let envConfig = {}
    try {
        if (app.env.isLocal()) {
            envConfig = require(path.resolve(configPath, `.${sep}config.local.js`))
        } else if (app.env.isBeta()) {
            envConfig = require(path.resolve(configPath, `.${sep}config.beta.js`))
        } else if (app.env.isProd()) {
            envConfig = require(path.resolve(configPath, `.${sep}config.prod.js`))
        }
    } catch (e) {
        console.log('[exception] failed to load env.config file:', e.message);
        console.log('Error details:', e.stack);
    }
    // 覆盖并加载 config 配置
    app.config = Object.assign({}, defaultConfig, envConfig)
}