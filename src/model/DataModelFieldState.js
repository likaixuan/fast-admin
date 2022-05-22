export default class DataModelFieldState {
  static tableName = "data_model_field_state";
  static primaryKey = "data_model_field_state_id";
  static modelCname = "模块管理";

  //
  static fields = [
    {
      name: "state_name",
      inputType: "input",
      label: "状态名称",
      useScene: "list||update||create",
      inputOptions: {
        placeholder: "请输入状态名称",
      },
    },
    {
      name: "state_value",
      inputType: "input",
      label: "状态值",
      useScene: "list||update||create",
      inputOptions: {
        placeholder: "请输入状态值",
      },
    },
  ];
}
