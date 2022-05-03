export default class Module {
  static tableName = "module";
  static primaryKey = "module_id";
  static parentIdName = "p_module_id";
  static modelCname = "模块管理";

  static MODULE_TYPE_CATALOGUE = 1; // 目录
  static MODULE_TYPE_MODULE = 2; // 模块

  static fields = [
    {
      name: "module_name",
      inputType: "input",
      label: "模块名",
      useScene: "*",
      inputOptions: {},
    },
    {
      name: "p_module_id",
      inputType: "cascader",
      label: "上级模块",
      useScene:'query',
      inputOptions: {
        list: [
          {
            module_name: "sb",
            module_id: "xxx",
          },
        ],
        props:{
          label: "module_name",
          value: "module_id",
        }
      },
    },
    {
      name: "module_url",
      inputType: "input",
      label: "模块地址",
      useScene: "*",
      inputOptions: {},
    },
    {
      name: "module_type",
      inputType: "select",
      label: "模块类型",
      useScene:'query||update||create',
      inputOptions: {
        list: [
          {
            label: "目录",
            value: 1,
          },
          {
            label: "模块",
            value: 2,
          },
        ],
      },
    },
    {
      name: "create_time",
      inputType: "input",
      label: "创建时间",
      useScene: "update||list",
      inputOptions: {
        disabled: true,
      },
    },
    {
      name: "update_time",
      inputType: "input",
      label: "修改时间",
      useScene: "update||list",
      inputOptions: {
        disabled: true,
      },
    },
  ];
}
