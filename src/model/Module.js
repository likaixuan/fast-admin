import request from "@/request";
export default class Module {
  static tableName = "module";
  static primaryKey = "module_id";
  static modelCname = "模块管理";

  static queryFieldMap = {
    module_name: {
      name: "module_name",
      type: "input",
      label: "模块名",
    }
  };

  static updateFieldMap = {
    module_name: {
        name: "module_name",
        type: "input",
        label: "模块名",
      }
  };

  static listFieldMap = {
    module_name: {
        name: "module_name",
        type: "input",
        label: "模块名",
      }
  };
}
