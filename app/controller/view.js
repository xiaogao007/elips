module.exports = (app) => {
    return class ViewController {
        /**
         * 渲染页面
         * @params {object} ctx 上下文
         */
        async renderPage(ctx) {
            const{query,params}=ctx.request
            app.logger.info(`[ViewController] query: ${JSON.stringify(query)}`)
            app.logger.info(`[ViewController] params: ${JSON.stringify(params)}`)
            await ctx.render(`dist/entry.${ctx.params.page}`, {
                name: app.options?.name,
                projKey:ctx.query?.proj_key,
                env: app.env.get(),
                options: JSON.stringify(app.options)
            })
        }
    }
}