module.exports = (app, router) => {
    const { view: viewController } = app.controller
    // 用户输入 http://ip:port/view/page1 渲染对应页面
    router.get('/view/:page', viewController.renderPage.bind(viewController))
    // 用户输入 http://ip:port/view/page1/* 渲染对应页面
    router.get('/view/:page/*', viewController.renderPage.bind(viewController))
}