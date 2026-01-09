module.exports = {
    name: '京东',
    desc: '京东电商',
    homePage: '/schema?proj_key=jd&key=product',
    menu: [
        {
            key: 'shop-setting',
            name: '店铺设置',
            menuType:'group',
            subMenu:[
                {
                    key:'info-setting',
                    name:'店铺信息设置',
                    menuType:'module',
                    moduleType:'custom',
                    customConfig:{
                        paht:'/todo'
                    }
                },
                {
                    key:'quality-setting',
                    name:'店铺资质',
                    menuType:'module',
                    moduleType:'iframe',
                    customConfig:{
                        paht:'http://www.jd.com'
                    }
                },
                {
                    key:'categories',
                    name:'经营类目',
                    menuType:'group',
                    subMenu:[
                        {
                            key:'category-1',
                            name:'分类一',
                            menuType:'module',
                            moduleType:'custom',
                            customConfig:{
                                path:'/todo'
                            }
                        },
                        {
                            key:'category-2',
                            name:'分类二',
                            menuType:'module',
                            moduleType:'iframe',
                            customConfig:{
                                path:'http://www.jd.com'
                            }
                        },{
                            key:'tag',
                            name:'标签',
                            menuType:'module',
                            moduleType:'custom',
                            customConfig:{
                                path:'/todo'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}