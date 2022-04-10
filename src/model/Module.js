export default class Module {
  static tableName = "module";
  static primaryKey = "module_id";
  static modelCname = "模块管理";

  // 查询表单
  static queryFieldMap = {
    module_name: {
      name: "module_name",
      type: "input",
      label: "模块名",
    }
  };

  // 编辑或者新增
  static updateFieldMap = {
    module_name: {
        name: "module_name",
        type: "input",
        label: "模块名",
      }
  };

  // 表格字段
  static listFieldMap = {
    module_name: {
        name: "module_name",
        type: "input",
        label: "模块名",
      }
  };
}
