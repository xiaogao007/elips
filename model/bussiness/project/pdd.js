module.exports = {
    name: '拼多多',
    desc: '拼多多电商',
    homePage: '',
    menu: [
        {
            key: 'product',
            name: '商品管理（PDD）'
        },
        {
            key: 'client',
            name: '客户管理（PDD）'
        },
        {
            key: 'data',
            name: '数据分析',
            menuType: 'module',
            moduleType: 'sider',
            siderConfig: {
                menu: [
                    {
                        key: 'analysis',
                        name: '电商罗盘',
                        menuType: 'module',
                        moduleType: 'custom',
                        customConfig: {
                            path: '/todo'
                        }
                    },
                    {
                        key: 'side-search',
                        name: '信息查询',
                        moduleType: 'iframe',
                        iframeConfig: {
                            path: 'http://www.baidu.com'
                        }
                    }
                ]
            }

        },
        {
            key: 'search',
            name: '信息查询',
            moduleType: 'iframe',
            iframeConfig: {
                path: 'http://www.baidu.com'
            }
        }

    ]
}