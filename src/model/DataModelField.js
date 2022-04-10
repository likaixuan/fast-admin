import request from "@/request";
export default class DataModelField {
  static tableName = "data_model_field";
  static primaryKey = "data_model_field_id";
  static modelCname = "数据模型";
  static queryFieldMap = {
    field_name: {
      name: "field_name",
      type: "input",
      label: "字段名",
    },
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "字段中文名",
    },
  };

  static updateFieldMap = {
    field_name: {
      name: "field_name",
      type: "input",
      label: "字段名",
    },
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "字段中文名",
    },
    data_type:{
        name:"data_type",
        type:'select',
        label:'数据类型',
        options:{
            list:[{label:'整型',value:1},
            {label:'图片',value:2}]
        }
    }
  };

  static listFieldMap = {
    field_name: {
      name: "field_name",
      type: "input",
      label: "字段名",
    },
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "字段中文名",
    },
  };
}
