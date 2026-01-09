module.exports = {
    name: '拼多多',
    desc: '拼多多电商',
    homePage: '/schema?proj_key=pdd&key=product',
    menu: [
        {
            key: 'product',
            name: '商品管理（PDD）'
        },
        {
            key: 'client',
            name: '客户管理（PDD）',
            moduleType: 'schema',
            schemaConfig: {
                api: '/api/pdd/client',
                schema: {}
            }
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
                        menuType: 'module',
                        moduleType: 'iframe',
                        iframeConfig: {
                            path: 'http://www.baidu.com'
                        }
                    },
                    {
                        key: 'categories',
                        name: '经营类目',
                        menuType: 'group',
                        subMenu: [
                            {
                                key: 'category-1',
                                name: '分类一',
                                menuType: 'module',
                                moduleType: 'custom',
                                customConfig: {
                                    path: '/todo'
                                }
                            },
                            {
                                key: 'category-2',
                                name: '分类二',
                                menuType: 'module',
                                moduleType: 'iframe',
                                customConfig: {
                                    path: 'http://www.jd.com'
                                }
                            }, {
                                key: 'tag',
                                name: '标签',
                                menuType: 'module',
                                moduleType: 'schema',
                                schemaConfig: {
                                    api: '/api/pdd/client',
                                    schema: {}
                                }
                            }
                        ]
                    }
                ]
            }

        },
        {
            key: 'search',
            name: '信息查询',
            menuType: 'module',
            moduleType: 'iframe',
            iframeConfig: {
                path: 'https://www.pinduoduo.com/'
            }
        }

    ]
}