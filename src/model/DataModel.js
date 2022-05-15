import request from "@/request";
export default class DataModel {
  static tableName = "data_model";
  static primaryKey = "data_model_id";
  static modelCname = "数据模型";

  static update = (params) => {
    return request.post("/admin/sys/dataModel/update", params);
  };

  static findAll = (params) => {
    return request.post(`/common/base/findAll?tableName=${this.tableName}&primaryKey=${this.primaryKey}`, params);
  };
  static fields = [
    {
      name: "data_model_name",
      inputType: "input",
      label: "数据模型名",
      useScene:'query||list||update||create',
      inputOptions:{

      }
    },
  {
      name: "table_name",
      inputType: "input",
      label: "表名",
      useScene:'query||list||update||create',
      inputOptions:{

      }
    },
    {
      name: "create_time",
      inputType: "input",
      label: "创建时间",
      useScene: "update||list",
      inputOptions: {
        disabled: true,
      },
    },
    {
      name: "update_time",
      inputType: "input",
      label: "修改时间",
      useScene: "update||list",
      inputOptions: {
        disabled: true,
      },
    },
  ]

}
