import request from "@/request";
export default class Role {
  static tableName = "role";
  static primaryKey = "role_id";
  static modelCname = "角色管理";

  static fields = [
     {
      name: "role_name",
      inputType: "input",
      label: "角色名称",
      useScene:"query||list||update||create",
      inputOptions:{
        placeholder:'请输入角色名称'
      }
    },
   {
      name: "role_code",
      inputType: "input",
      label: "角色编码",
      useScene:"query||list||update||create",
      inputOptions:{
        placeholder:'请输入角色编码'
      }
    },
    {
      name: "create_time",
      inputType: "input",
      label: "创建时间",
      useScene:"list||update",
     
      inputOptions:{
        disabled: true,
      }
    },
     {
      name: "update_time",
      inputType: "input",
      label: "修改时间",
      useScene:"list||update",
      disabled: true,
      inputOptions:{
        disabled: true,
      }
    },
  ]
  
}
