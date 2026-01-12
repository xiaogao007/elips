module.exports = {
    mode: 'dashboard',//模板类型 不同模板对应不一样的模板数据结构
    name: '',
    desc: '',
    icon: '',
    homePage: '',
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
                api: '',//数据源api(遵循 RESTFUL 规则)
                schema: {//模块数据结构
                    type: 'object',
                    properties: {
                        key: {
                            ...schema,//标准 schema 配置
                            type: '',//字段类型
                            label: '',//字段中文名
                            // 字段在table中的配置
                            tableOptions: {
                                ...tlTableClomnOptions,//标准 table 列配置
                                visible: true,//是否在table中显示
                            },
                            // 字段在searchba中的配置
                            searchOptions: {
                                ...eleComponentConfig, //标准的el-component-column配置
                                comType: '',//配置组件类型 input/select
                                default: '',//默认值
                                // comType === select
                                enumList: [],//下拉框选项
                                // comType === dynamicSelect
                                api: ''
                            },
                            createFromOption: {
                                ...eleComponentConfig,//标准的el-component配置
                                comType: '',//控件类型 input/select...
                                visible: true,//是否展示
                                disabled: false,//是否禁用
                                default: '',//默认值

                                // comType === select
                                enumList: []
                            },
                            ...
                        },
                    }
                }
            },
            tableConfig: {
                headerButtons: [
                    {
                        label: '',//按钮名称
                        eventKey: '',//按钮事件标识
                        //按钮配置
                        eventOption: {
                            // 当eventKey === showComponent
                            comName: '',//组件名
                        },
                        ...elButtonConfig//标准 el-button 配置
                    },
                ],//table头部按钮
                rowButtons: [
                    {
                        label: '',//按钮名称
                        eventKey: '',//按钮事件标识
                        eventOption: {
                            // 当eventKey === showComponent
                            comName: '',//组件名
                            // 当key====remove
                            params: {
                                // paramKey = 参数的键值
                                // rowValueKey = 参数值
                                paramKey: rowValueKey
                            },
                        },//按钮配置
                        ...elButtonConfig//标准 el-button 配置
                    },
                ],//table行按钮
            },//table 相关配置
            //search-bar相关配置
            searchConfig: {},
            //动态组件 配置
            componentConfig: {
                // create-form 表单相关配置
                createForm: {
                    title: '',//表单标题
                    saveBtnText: '',//保存按钮文字
                }
                // ...支持用户动态扩展
            }
        },
    ]
}  