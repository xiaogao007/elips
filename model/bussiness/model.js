module.exports = {
    model: 'dashboard',
    name: '电商系统',
    menu: [
        {
            key: 'product',
            name: '商品管理',
            menuType: 'module',
            moduleType:'custom',
            customConfig: {
                path: 'todo'
            }
        },
        {
            key: 'order',
            name: '订单管理',
            menuType: 'module',
            moduleType:'custom',
            customConfig: {
                path: 'todo'
            }
        },
        {
            key: 'client',
            name: '客户管理',
            menuType: 'module',
            moduleType:'custom',
            customConfig: {
                path: 'todo'
            }
        },
    ]
}