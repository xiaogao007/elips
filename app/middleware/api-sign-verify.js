const md5 = require('md5')
/**
 * API 签名合法性校验
 */
module.exports = (app) => {
    return async (ctx, next) => {
        // 只对 API 请求做处理
        if (ctx.path.indexOf('/api') < 0) {
            return await next()
        }
        const { path, method } = ctx
        const { headers } = ctx.request
        const { s_sign: sSign, s_t: st } = headers

        const signKey = 'vhcw9548g7hw045g7hg08547y'
        const signature = md5(`${signKey}_${st}`)
        console.log("🚀 ~ signature:", signature)
        app.logger.info(`[${method} ${path}] signature: ${signature}`)
        if (!sSign || !st || signature !== sSign.toLowerCase() || Date.now() - st > 600000) {
            ctx.status = 200
            ctx.body = {
                success: false,
                message: 'signature not correct!',
                code: 445
            }
            return
        }
        await next()
    }
}