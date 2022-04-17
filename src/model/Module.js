export default class Module {
  static tableName = "module";
  static primaryKey = "module_id";
  static parentIdName = "p_module_id";
  static modelCname = "模块管理";

  static MODULE_TYPE_CATALOGUE = 1; // 目录
  static MODULE_TYPE_MODULE = 2; // 模块

  // 查询表单
  static queryFieldMap = {
    module_name: {
      name: "module_name",
      type: "input",
      label: "模块名",
    },
    p_module_id: {
      name: "p_module_id",
      type: "cascader",
      label: "上级模块",
      options: {
        list: [
          {
            module_name: "sb",
            module_id: "xxx",
          },
        ],
        labelName: "module_name",
        valueName: "module_id",
      },
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
    p_module_id: {
      name: "p_module_id",
      type: "cascader",
      label: "上级模块",
      options: {
        list: [
          {
            module_name: "sb",
            module_id: "xxx",
          },
        ],
        labelName: "module_name",
        valueName: "module_id",
      },
    },
    module_type: {
      name: "module_type",
      type: "select",
      label: "模块类型",
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
    create_time: {
      name: "create_time",
      type: "input",
      label: "创建时间",
      disabled: true,
    },
    update_time: {
      name: "update_time",
      type: "input",
      label: "修改时间",
      disabled: true,
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
    module_type: {
      name: "module_type",
      type: "select",
      label: "模块类型",
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
    p_module_id: {
      name: "p_module_id",
      type: "cascader",
      label: "上级模块",
      options: {
        list: [
          {
            module_name: "sb",
            module_id: "xxx",
          },
        ],
        labelName: "module_name",
        valueName: "module_id",
      },
    },
    create_time: {
      name: "create_time",
      type: "input",
      label: "创建时间",
      disabled: true,
    },
    update_time: {
      name: "update_time",
      type: "input",
      label: "修改时间",
      disabled: true,
    },
  };
  
}
