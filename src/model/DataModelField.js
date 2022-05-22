import request from "@/request";
export default class DataModelField {
  static tableName = "data_model_field";
  static primaryKey = "data_model_field_id";
  static modelCname = "数据模型";

  static update = (params) => {
    return request.post("/admin/sys/dataModelField/update", params);
  };

  static remove = (params) => {
    return request.post("/admin/sys/dataModelField/remove", params);
  };

  static inputMap = {
    text: {
      input_type: "input",
      field_type: "varchar",
      data_type: "String",
      len: 255,
    },
    select: {
      input_type: "select",
      field_type: "int",
      data_type: "Number",
      len: 10,
    },
    textarea: {
      input_type: "textarea",
      field_type: "varchar",
      data_type: "String",
      len: 1024,
    },
    join: {
      input_type: "join",
      field_type: "bigint",
      data_type: "String",
      len: 20,
    },
  };

  static fields = [
    {
      name: "field_c_name",
      inputType: "input",
      label: "列中文名",
      useScene: "query||list||update||create",
      inputOptions: {
        placeholder: "请输入列中文名",
      },
    },
    {
      name: "field_name",
      inputType: "input",
      label: "数据字段名",
      useScene: "query||list||update||create",
      inputOptions: {
        placeholder: "请输入数据库字段名",
      },
    },
    {
      name: "len",
      inputType: "input",
      label: "列长",
      useScene: "query||list||update||create",
      inputOptions: {
        disabled: true,
      },
    },
    {
      name: "field_type",
      inputType: "input",
      label: "列类型",
      useScene: "query||list||update||create",
      inputOptions: {
        disabled: true,
      },
    },
    {
      name: "input_type",
      inputType: "input",
      label: "组件",
      useScene: "query||list||update||create",
      inputOptions: {
        disabled: true,
      },
    },
    {
      name: "data_type",
      inputType: "input",
      label: "前端数据类型",
      useScene: "query||list||update||create",
      inputOptions: {
        disabled: true,
      },
    },
  ];
}
