import request from "../request";
export default class User {
  static tableName = "user";
  static primaryKey = "user_id";
  static modelCname = "角色管理";
  // 验证码
  static getVerifyCodeUrl = "/Admin/getVerifyCode";

  // 登录
  static login = (params) => {
    return request.post("/admin/sys/user/login", params);
  };

  // 获取路由及权限
  static getMyGrantModule = (params) => {
    return request.post("/Admin/Sys/User/getMyGrantModule", params);
  };

  static fields = [
    {
      name: "user_name",
      inputType: "input",
      label: "用户名",
      useScene: "query||list||update||create",
      inputOptions: {
        placeholder: "请输入用户名",
      },
    },
    {
      name: "real_name",
      inputType: "input",
      label: "真实姓名",
      useScene: "query||list||update||create",
      inputOptions: {
        placeholder: "请输入真实姓名",
      },
    },
    {
      name: "phone",
      inputType: "input",
      label: "phone",
      useScene: "query||list||update||create",
      inputOptions: {
        placeholder: "请输入手机号",
      },
    },
    {
      name: "create_time",
      inputType: "input",
      label: "创建时间",
      useScene: "list||update",

      inputOptions: {
        disabled: true,
      },
    },
    {
      name: "update_time",
      inputType: "input",
      label: "修改时间",
      useScene: "list||update",
      disabled: true,
      inputOptions: {
        disabled: true,
      },
    },
  ];
}
