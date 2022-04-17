export default class ModuleDm {
  static tableName = "module_dm";
  static primaryKey = "module_dm_id";
  static parentIdName = "p_module_dm_id";
  static modelCname = "数据模型对象";

  // 查询表单
  static queryFieldMap = {};

  // 编辑或者新增
  static updateFieldMap = {
    data_model_id: {
        name: "data_model_id",
        type: "select",
        label: "引用数据模型",
        options: {
          list: [],
          labelName:'data_model_name',
          valueName:'data_model_id'
        },
      },
    module_dm_name: {
      name: "module_dm_name",
      type: "input",
      label: "数据模型名",
    },
    module_dm_code: {
      name: "module_dm_code",
      type: "input",
      label: "模型编码",
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
  static listFieldMap = {};
}
