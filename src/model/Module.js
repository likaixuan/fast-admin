export default class Module {
  static tableName = "module";
  static primaryKey = "module_id";
  static modelCname = "模块管理";

  // 查询表单
  static queryFieldMap = {
    module_name: {
      name: "module_name",
      type: "input",
      label: "模块名",
    },
  };

  // 编辑或者新增
  static updateFieldMap = {
    module_name: {
      name: "module_name",
      type: "input",
      label: "模块名",
    },
    module_url: {
      name: "module_url",
      type: "input",
      label: "模块地址",
    },
    module_type: {
      name: "module_url",
      type: "select",
      label: "模块地址",
      options: {
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
  };

  // 表格字段
  static listFieldMap = {
    module_name: {
      name: "module_name",
      type: "input",
      label: "模块名",
    },
    module_url: {
      name: "module_url",
      type: "input",
      label: "模块地址",
    },
  };
}
