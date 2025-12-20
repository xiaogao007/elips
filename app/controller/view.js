module.exports=(app)=>{
    return class ViewController{
        /**
         * 渲染页面
         * @params {object} ctx 上下文
         */
        async renderPage(ctx){
            await ctx.render(`output/enter.${ctx.params.page}`)
        }
    }
}