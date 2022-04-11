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
      input_type: "text",
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
      data_type: "Number",
      len: 1024,
    },
  };

  static queryFieldMap = {
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "列中文名",
    },
    field_name: {
      name: "field_name",
      type: "input",
      label: "数据库列名",
    },
  };

  static updateFieldMap = {
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "列中文名",
    },
    field_name: {
      name: "field_name",
      type: "input",
      label: "数据库列名",
    },
    len: {
      name: "len",
      type: "input",
      label: "列长"
    },
    field_type: {
      name: "field_type",
      type: "input",
      label: "列类型",
      disabled:true
    },
    input_type: {
      name: "input_type",
      type: "input",
      label: "组件",
      disabled:true
    },
    data_type: {
      name: "data_type",
      type: "input",
      label: "前端数据类型",
      disabled:true
    },

  };

  static listFieldMap = {
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "列中文名",
    },
    field_name: {
      name: "field_name",
      type: "input",
      label: "数据库列名",
    },
    len: {
      name: "len",
      type: "input",
      label: "列长"
    },
    field_type: {
      name: "field_type",
      type: "input",
      label: "列类型",
      disabled:true
    },
    input_type: {
      name: "input_type",
      type: "input",
      label: "组件",
      disabled:true
    },
    data_type: {
      name: "data_type",
      type: "input",
      label: "数据类型",
      disabled:true
    },
  };
}
