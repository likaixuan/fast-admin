import request from "@/request";
export default class Article {
  static tableName = "article";
  static primaryKey = "_id";
  static modelCname = "文章管理";

  static fields = [
    {
      name: "title",
      inputType: "input",
      label: "标题",
      useScene:'query||update||create||list',
      inputOptions: {},
    },
    {
      name: "content",
      inputType: "input",
      label: "内容",
      useScene:'query||update||create||list',
      inputOptions: {},
    },
  ];
}
