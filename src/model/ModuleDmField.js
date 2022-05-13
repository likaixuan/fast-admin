import request from "@/request";
export default class ModuleDmField {
  static tableName = "module_dm_field";
  static primaryKey = "module_dm_field_id";
  static modelCname = "模块数据模型字段";

  // static update = (params) => {
  //   return request.post("/admin/sys/dataModelField/update", params);
  // };

  // static remove = (params) => {
  //   return request.post("/admin/sys/dataModelField/remove", params);
  // };

  static fields = [
    {
      name: "field_c_name",
      inputType: "input",
      label: "列中文名",
      useScene: "update||create||list",
      inputOptions: {
        placeholder: "请输入列中文名",
      },
    },
    {
      name: "field_name",
      inputType: "input",
      label: "数据库列名",
      useScene: "update||create||list",
      inputOptions: {
        placeholder: "请输入列中文名",
      },
    },
    {
      name: "input_type",
      inputType: "input",
      label: "组件",
      useScene: "update||create||list",
      inputOptions: {
        placeholder: "请输入列中文名",
        disabled: true,
      },
    },
    {
      name: "required",
      inputType: "select",
      label: "必填",
      useScene: "update||create||list",
      inputOptions: {
        list: [
          {
            label: "否",
            value: 0,
          },
          {
            label: "是",
            value: 1,
          },
        ],
      },
    },
    {
      name: "can_query",
      inpitType: "select",
      label: "查询区",
      useScene: "update||create||list",
      inputOptions: {
        list: [
          {
            label: "否",
            value: 0,
          },
          {
            label: "是",
            value: 1,
          },
        ],
      },
    },
    {
      name: "can_list",
      inputType: "select",
      label: "列表区",
      useScene: "update||create||list",
      inputOptions: {
        list: [
          {
            label: "否",
            value: 0,
          },
          {
            label: "是",
            value: 1,
          },
        ],
      },
    },
    {
      name: "can_update",
      inputType: "select",
      label: "编辑区",
      useScene: "update||create||list",
      inputOptions: {
        list: [
          {
            label: "否",
            value: 0,
          },
          {
            label: "是",
            value: 1,
          },
        ],
      },
    },
    {
      name: "field_type",
      inputType: "input",
      label: "列类型",
      useScene: "update||create||list",
      inputOptions: {
        disabled: true,
      },
    },
    {
      name: "data_type",
      inputType: "input",
      label: "前端数据类型",
      useScene: "update||create||list",
      inputOptions: {
        disabled: true,
      },
    },
  ];
}
