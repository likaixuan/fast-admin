import request from "@/request";
export default class Article {
  static tableName = "article";
  static primaryKey = "article_id";
  static modelCname = "评论";

  static queryFieldMap = {
    title: {
      name: "title",
      type: "input",
      label: "标题",
    },
    content: {
      name: "content",
      type: "input",
      label: "内容",
    },
  };

  static updateFieldMap = {
    title: {
        name: "title",
        type: "input",
        label: "标题",
      },
      content: {
        name: "content",
        type: "input",
        label: "内容",
      },
  };

  static listFieldMap = {
    title: {
        name: "title",
        type: "input",
        label: "标题",
      },
      content: {
        name: "content",
        type: "input",
        label: "内容",
      },
  };
}
