module.exports = (app) => {
    const baseController = require('./base')(app)
    return class BussinessController extends baseController {
        remove(ctx) {
            const { product_id: productId } = ctx.request.body
            this.success(ctx, {
                projKey: ctx.projKey,
                product_id: productId
            })
        }
        getList(ctx) {
            const { product_name: productName, page, size } = ctx.request.query
            let productList = [
                {
                    product_id: '1',
                    product_name: ctx.projKey + '前端进阶',
                    price: 99.99,
                    inventory: 100000,
                    create_time: '2023-07-03 08:30:00'
                },
                {
                    product_id: '1',
                    product_name: ctx.projKey + '后端进阶',
                    price: 299.99,
                    inventory: 100000,
                    create_time: '2024-07-03 08:30:00'
                },
                {
                    product_id: '1',
                    product_name: ctx.projKey + 'AI全栈',
                    price: 999.99,
                    inventory: 100000,
                    create_time: '2025-07-03 08:30:00'
                },
            ]
            if (productName) {
                productList = productList.filter(item => item.product_name.indexOf(productName) != -1)
            }
            this.success(ctx, productList, { total: 3, page, size })
        }
        getProductEnumList(ctx) {
            this.success(ctx, [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '前端',
                    value: '前端'
                },
                {
                    label: '后端',
                    value: '后端'
                }
            ], {})
        }
    }
}