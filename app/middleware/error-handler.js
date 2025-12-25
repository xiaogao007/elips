/**
 * 运行时异常错误处理，兜底所有异常
 * @params {[object]} koa app
 */
module.exports=(app)=>{
    return async(ctx,next)=>{
        try{
            await next()
        }catch(e){
            // 异常处理
            const {status,message,detail}=e
            app.logger.info(JSON.stringify(e))
            app.logger.info('[-- exception --]:',e)
            app.logger.error('[-- exception --]:',status,message,detail)

            if(message&&message.indexOf('template not found')>-1){
                //页面重定向
                ctx.status=302 //临时重定向
                ctx.redirect(`${app.options?.homePage}`)
                return
            }

            const resBody={
                success:false,
                code:50000,
                message:'服务异常，请稍后重试'
            }
            ctx.status=200,
            ctx.body=resBody
        }
    }
}