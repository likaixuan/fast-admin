export default class ModuleDm {
  static tableName = "module_dm";
  static primaryKey = "module_dm_id";
  static parentIdName = "p_module_dm_id";
  static modelCname = "数据模型对象";

  static fields = [
    {
      name: "data_model_id",
      inputType: "select",
      label: "引用数据模型",
      useScene: "update||create",
      inputOptions: {
        placeholder: "请选择引用的数据模型",
        list: [],
        labelName: "data_model_name",
        valueName: "data_model_id",
      },
    },
    {
      name: "module_dm_name",
      inputType: "input",
      label: "数据模型名",
      useScene: "update||create",
      inputOptions: {
        placeholder: "请输入数据模型名",
      },
    },
    {
      name: "module_dm_code",
      inputType: "input",
      label: "模型编码",
      useScene: "update||create",
      inputOptions: {
        placeholder: "请输入模型编码",
      },
    },

    {
      name: "create_time",
      inputType: "input",
      label: "创建时间",
      useScene: "update",

      inputOptions: {
        disabled: true,
      },
    },
    {
      name: "update_time",
      inputType: "input",
      label: "修改时间",
      useScene: "update",
      disabled: true,
      inputOptions: {
        disabled: true,
      },
    },
  ];
}
