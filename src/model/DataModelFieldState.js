export default class DataModelFieldState {
  static tableName = "data_model_field_state";
  static primaryKey = "data_model_field_state_id";
  static modelCname = "模块管理";

  // 查询表单
  static queryFieldMap = {
    state_name: {
      name: "state_name",
      type: "input",
      label: "状态名称",
    },
  };

  // 编辑或者新增
  static updateFieldMap = {
    state_name: {
      name: "state_name",
      type: "input",
      label: "状态名称",
    },
    state_value: {
      name: "state_value",
      type: "input",
      label: "状态值",
    },
  };

  // 表格字段
  static listFieldMap = {
    state_name: {
      name: "state_name",
      type: "input",
      label: "状态名称",
    },
    state_value: {
      name: "state_value",
      type: "input",
      label: "状态值",
    },
  };
}
