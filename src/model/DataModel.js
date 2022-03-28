import request from "@/request";
export default class DataModel {
  static primaryKey = "data_model_id"
  static url = "/admin/sys/dataModel"
  static modelCname = "数据模型"

  static actions = {
    findAll(params) {
      return request.post("/admin/sys/dataModel/findAll", params);
    },
    update(params) {
      return request.post("/admin/sys/dataModel/update", params);
    },
    remove(params) {
      return request.post("/admin/sys/dataModel/remove", params);
    }
  }

  static queryFieldMap = {
    data_model_name: {
      name: "data_model_name",
      type: "input",
      label: "数据模型名",
    },
    table_name: {
      name: "table_name",
      type: "input",
      label: "表名",
    },
  }

  static createFieldMap = {
    data_model_name: {
      name: "data_model_name",
      type: "input",
      label: "数据模型名",
    },
    table_name: {
      name: "table_name",
      type: "input",
      label: "表名",
    },
  }

  static updateFieldMap = {
    data_model_name: {
      name: "data_model_name",
      type: "input",
      label: "数据模型名",
    },
    table_name: {
      name: "table_name",
      type: "input",
      label: "表名",
    },
    type: {
      name: "type",
      type: "input",
      label: "类别",
    },
  }

  static listFieldMap = {
    data_model_name: {
      name: "data_model_name",
      type: "input",
      label: "数据模型名",
    },
    table_name: {
      name: "table_name",
      type: "input",
      label: "表名",
    },
    type: {
      name: "type",
      type: "input",
      label: "类别",
    },
  }

}
