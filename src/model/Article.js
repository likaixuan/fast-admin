import request from "@/request";
export default class Article {
  static tableName = "article";
  static primaryKey = "article_id";
  static modelCname = "文章管理";

  // 查询表单
  static queryFieldMap = {
    title: {
      name: "title",
      type: "input",
      label: "标题",
    },
  };

  // 编辑或者新增
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
  // 表格字段
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
