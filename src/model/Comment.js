import request from "@/request";
export default class Comment {
  static tableName = "comment";
  static primaryKey = "comment_id";
  static modelCname = "评论";

  static queryFieldMap = {
    content: {
      name: "content",
      type: "input",
      label: "内容",
    },
  };

  static updateFieldMap = {
    content: {
      name: "content",
      type: "input",
      label: "内容",
    },
  };

  static listFieldMap = {
    content: {
      name: "content",
      type: "input",
      label: "内容",
    },
  };
}
