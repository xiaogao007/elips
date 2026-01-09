module.exports = (app, router) => {
  const { bussiness: bussinessController } = app.controller;
  router.delete(
    "/api/proj/product",
    bussinessController.remove.bind(bussinessController)
  );
  router.get(
    "/api/proj/product/list",
    bussinessController.getList.bind(bussinessController)
  );
};
