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

  static queryFieldMap = {
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "列中文名",
    }
  };

  static updateFieldMap = {
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "列中文名",
    },
    field_name: {
      name: "field_name",
      type: "input",
      label: "数据库列名",
    },
    input_type: {
      name: "input_type",
      type: "input",
      label: "组件",
      disabled: true,
    },
    required: {
      name: "required",
      type: "select",
      label: "必填",
      options: {
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
    can_query: {
      name: "can_query",
      type: "select",
      label: "查询区",
      options: {
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
    can_list: {
      name: "can_list",
      type: "select",
      label: "列表区",
      options: {
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
    can_update: {
      name: "can_update",
      type: "select",
      label: "编辑区",
      options: {
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
    field_type: {
      name: "field_type",
      type: "input",
      label: "列类型",
      disabled: true,
    },
    data_type: {
      name: "data_type",
      type: "input",
      label: "前端数据类型",
      disabled: true,
    },
  };

  static listFieldMap = {
    field_c_name: {
      name: "field_c_name",
      type: "input",
      label: "列中文名",
    },
    field_name: {
      name: "field_name",
      type: "input",
      label: "数据库列名",
    },
    input_type: {
      name: "input_type",
      type: "input",
      label: "组件",
      disabled: true,
    },
    required: {
      name: "required",
      type: "select",
      label: "必填",
      options: {
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
    can_query: {
      name: "can_query",
      type: "select",
      label: "查询显示",
      options: {
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
    can_list: {
      name: "can_list",
      type: "select",
      label: "列表显示",
      options: {
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
    can_update: {
      name: "can_update",
      type: "select",
      label: "编辑显示",
      options: {
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
    field_type: {
      name: "field_type",
      type: "input",
      label: "列类型",
      disabled: true,
    },
    data_type: {
      name: "data_type",
      type: "input",
      label: "前端数据类型",
      disabled: true,
    },
  };
}
