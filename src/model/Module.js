import request from "@/request";
export default class Module {
  static tableName = "module";
  static primaryKey = "module_id";

  static url = "/common/base";
  static modelCname = "模块";
  static urlSuffix = `?tableName=${this.tableName}&primaryKey=${this.primaryKey}`;

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
      },
    //   module_code: {
    //     name: "module_code",
    //     type: "input",
    //     label: "模块编码",
    //   },
  };

  static listFieldMap = {
    module_name: {
        name: "module_name",
        type: "input",
        label: "模块名",
      },
    //   module_code: {
    //     name: "module_code",
    //     type: "input",
    //     label: "模块编码",
    //   },
  };
}
