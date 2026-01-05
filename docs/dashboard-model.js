module.exports = {
    mode: 'dashboard',//模板类型 不同模板对应不一样的模板数据结构
    name:'',
    desc:'',
    icon:'',
    homePage:'',
        // 头部菜单
        menu: [
            {
                key: '',//菜单唯一描述
                name: '',//菜单名称
                menuType: '',//枚举值：group/module
                // 当menuType为group,可填
                subMenu: [
                    {
                        //可递归menuItem
                    }
                ],
                // 当menuType为module时
                moduleType: '',//枚举值：sider/iframe/custom/schema
                // 当menuType为sider
                siderConfig: {
                    menu: [
                        {
                            //可递归menuItem(除 moduleType === sider)
                        }
                    ]
                },
                // 当menuType为iframe
                iframeConfig: {
                    path: '',//iframe路径
                },
                // 当menuType为custom
                customConfig: {
                    path: '',//自定义路由路径
                },
                // 当menuType为schema
                schemaConfig: {
                    api:'/api/user',//数据源api(遵循 RESTFUL 规则)
                    schema:{//模块数据结构
                        type:'object',
                        properties:{
                            key:{
                                ...schema,//标准 schema 配置
                                type:'',//字段类型
                                label:'',//字段中文名
                            },
                        }
                    }
                },
                tableConfig:{},//table 相关配置
                searchConfig:{},//search-bar相关配置
                components:{}//模块组件
            },
        ]
}  