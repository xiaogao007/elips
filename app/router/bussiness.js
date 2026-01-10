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
  router.get(
    "/api/proj/product_enum/list",
    bussinessController.getProductEnumList.bind(bussinessController)
  );

};
