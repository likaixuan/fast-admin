import request from "@/request";
export default class DataModel {
  static tableName = "data_model";
  static primaryKey = "data_model_id";
  static modelCname = "数据模型";

  static update = (params) => {
    return request.post("/admin/sys/dataModel/update", params);
  };

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
  };

  static updateFieldMap = {
    data_model_name: {
      name: "data_model_name",
      type: "input",
      label: "数据模型名",
      options: {
        link: {
          change: (formData, fieldMap, dataModel) => {
            if (formData.data_model_name === "xxx") {
              fieldMap.table_name.notShow = true;
            } else {
              fieldMap.table_name.notShow = false;
            }
            if (formData.data_model_name === "禁用表名") {
              fieldMap.table_name.disabled = true;
            } else {
              fieldMap.table_name.disabled = false;
            }
          },
        },
      },
    },
    table_name: {
      name: "table_name",
      type: "input",
      label: "表名",
    },
  };

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
      options: {
        link: {
          change: (formData, fieldMap, dataModel) => {
            console.log("响应了 哈哈哈哈", formData, fieldMap, dataModel);
          },
        },
      },
    },
  };
}
