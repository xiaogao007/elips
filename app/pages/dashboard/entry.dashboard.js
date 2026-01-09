import boot from '$pages/boot'
import dashboard from './dashboard.vue'

const routes = []
// 顶部菜单路由
routes.push({
    path: '/view/dashboard/iframe',
    component: () => import('./complex-view/iframe-view/iframe-view.vue')
})
routes.push({
    path: '/view/dashboard/schema',
    component: () => import('./complex-view/schema-view/schema-view.vue')
})
// custom自定义路由
routes.push({
    path: '/view/dashboard/todo',
    component: () => import('./todo/todo.vue')
})
// 侧边菜单路由
routes.push({
    path: '/view/dashboard/sider',
    component: () => import('./complex-view/sider-view/sider-view.vue'),
    children: [{
        path: 'iframe',
        component: () => import('./complex-view/iframe-view/iframe-view.vue')
    }, {
        path: 'schema',
        component: () => import('./complex-view/schema-view/schema-view.vue')
    }, {
        // custom自定义路由
        path: 'todo',
        component: () => import('./todo/todo.vue')
    }]
})
// 侧边栏兜底
routes.push({
    path:'/view/dashboard/sider/:chapters+',
    component: () => import('./complex-view/sider-view/sider-view.vue'),
})

boot(dashboard,{routes})