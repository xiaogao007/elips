module.exports = {
  model: "dashboard",
  name: "电商系统",
  menu: [
    {
      key: "product",
      name: "商品管理",
      menuType: "module",
      moduleType: "schema",
      schemaConfig: {
        api: "/api/proj/product",
        schema: {
          type: "object",
          properties: {
            product_id: {
              type: "string",
              label: "商品ID",
              tableOption: {
                width: 300,
                "show-overflow-tooltip": true,
              },
            },
            product_name: {
              type: "string",
              label: "商品名称",
              tableOption: {
                width: 200,
              },
            },
            price: {
              type: "number",
              label: "商品价格",
              tableOption: {
                width: 200,
              },
            },
            inventory: {
              type: "number",
              label: "库存",
              tableOption: {
                width: 200,
              },
            },
            create_time: {
              type: "string",
              label: "创建时间",
              tableOption: {},
            },
          },
        },
      },
      tableConfig: {
        headerButtons: [
          {
            label: "新增商品",
            eventKey: "showComponent",
            type: "primary",
            plain: true,
          },
        ],
        rowButtons: [
          {
            label: "修改",
            eventKey: "showComponent",
            type: "warning",
          },
          {
            label: "删除",
            eventKey: "remove",
            type: "danger",
            eventOption: {
              params: {
                product_id: "schema::product_id",
              },
            },
          },
        ],
      },
    },
    {
      key: "order",
      name: "订单管理",
      menuType: "module",
      moduleType: "custom",
      customConfig: {
        path: "todo",
      },
    },
    {
      key: "client",
      name: "客户管理",
      menuType: "module",
      moduleType: "custom",
      customConfig: {
        path: "todo",
      },
    },
  ],
};
