module.exports=(app)=>{
    const baseController = require('./base')(app)
    return class BussinessController extends baseController{
        remove(ctx){
            const {product_id:productId}=ctx.request.body
            this.success(ctx,{
                projKey:ctx.projKey,
                product_id:productId
            })
        }
        getList(ctx){
            this.success(ctx,[
                {
                    product_id:'1',
                    product_name:ctx.projKey+'前端进阶',
                    price:99.99,
                    inventory:100000,
                    create_time:'2023-07-03 08:30:00'
                },
                {
                    product_id:'1',
                    product_name:'后端进阶',
                    price:299.99,
                    inventory:100000,
                    create_time:'2024-07-03 08:30:00'
                },
                {
                    product_id:'1',
                    product_name:'AI全栈',
                    price:999.99,
                    inventory:100000,
                    create_time:'2025-07-03 08:30:00'
                },
            ],{total:3})
        }
    }
}