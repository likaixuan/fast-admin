import request from "@/request";
export default class Comment {
  static tableName = "comment";
  static primaryKey = "comment_id";
  static modelCname = "评论管理";

  // 查询表单
  static queryFieldMap = {
    content: {
      name: "content",
      type: "input",
      label: "内容",
    }
  };

  // 编辑或者新增
  static updateFieldMap = {
    content: {
      name: "content",
      type: "input",
      label: "内容",
    },
  };

  // 表格字段
  static listFieldMap = {
    content: {
      name: "content",
      type: "input",
      label: "内容",
    },
  };
}
