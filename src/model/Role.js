import request from "@/request";
export default class Role {
  static tableName = "role";
  static primaryKey = "role_id";
  static modelCname = "角色管理";

  // 查询表单
  static queryFieldMap = {
    role_name: {
      name: "role_name",
      type: "input",
      label: "角色名称",
    },
  };

  // 编辑或者新增
  static updateFieldMap = {
    role_name: {
      name: "role_name",
      type: "input",
      label: "角色名称",
    },
    role_code: {
      name: "role_code",
      type: "input",
      label: "角色编码",
    },
    create_time: {
        name: "create_time",
        type: "input",
        label: "创建时间",
        disabled:true
      },
      update_time: {
        name: "update_time",
        type: "input",
        label: "修改时间",
        disabled:true
      },
  };
  // 表格字段
  static listFieldMap = {
    role_name: {
      name: "role_name",
      type: "input",
      label: "角色名称",
    },
    role_code: {
      name: "role_code",
      type: "input",
      label: "角色编码",
    },
    create_time: {
      name: "create_time",
      type: "input",
      label: "创建时间",
      disabled:true
    },
    update_time: {
      name: "update_time",
      type: "input",
      label: "修改时间",
      disabled:true
    },
  };
}
