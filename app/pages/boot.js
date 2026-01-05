import { createApp } from "vue";
import pinia from '$store'
// 引入elementUI

import ElementUI from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './assets/custom.css'

import { createRouter, createWebHashHistory } from "vue-router";

/**
 * vue 页面主入口，用于启动vue
 * @params pageComponent vue 入口组件
 * @params routes 路由列表
 * @params libs 页面依赖的三方包
 */
export default (pageComponent, { routes, libs={} } = {}) => {
    const app = createApp(pageComponent);
    // 引入 element
    app.use(ElementUI)
    // 引入pinia
    app.use(pinia)
    // 引入第三方包
    if(libs&&libs.length){
        for (let i = 0; i < libs.length; i++) {
            app.use(libs[i])
        }
    }
    // 引入router
    if (routes && routes.length) {
        const router = createRouter({
            history: createWebHashHistory(),
            routes
        })
        app.use(router)
        router.isReady().then(() => {
            app.mount('#root')
        })
    } else {
        app.mount('#root')
    }
}