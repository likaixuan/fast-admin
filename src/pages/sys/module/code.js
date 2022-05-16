export default {
  // 生成fields
  _genFields(fields) {
    return JSON.stringify(
      fields
        .filter((item) => {
          return item.use_scene;
        })
        .map((item) => {
          let t = {
            name: item.field_name,
            inputType: item.input_type,
            label: item.field_c_name,
            inputOptions: {
              placeholder: `请输入${item.field_c_name}`,
            },
          };
          if (item.disable_scene) {
            t.disableScene = item.disable_scene;
          }
          if (item.required === 1) {
            t.rules = t.rules || [];
            t.rules.push({
              required: true,
              message: `${item.field_c_name}不能为空`,
              trigger: "blur",
            });
          }

          t.useScene = item.use_scene;

          return t;
        }),
      null,
      2
    );
  },
  // 生成模型代码
  genModelClassCode(treeData) {
    const {
      modelName,
      tableName,
      primaryKey,
      modelCname,
      fields = [],
    } = treeData;
    let str = `
      class ${modelName} {
        static tableName = "${tableName}";
        static primaryKey = "${primaryKey}";
        static modelCname = "${modelCname}";

        static fields = ${this._genFields(fields)}
      }
    `;
    treeData.children &&
    treeData.children.forEach((item) => {
        str += this.genModelClassCode(item);
      });
    return str;
  },
  genSubTemplateCode(treeData) {
    let str = ``;
    if (treeData.children && treeData.children.length > 0) {
      str += `<template v-slot:updateFormAfter v-if="${treeData.modelName}M.isUpdate">
        <el-tabs type="border-card">
      `;
      treeData.children.forEach((item) => {
        str += `<el-tab-pane label="${item.modelCname}">
          <Crud :dataModel="${item.modelName}M">
            ${this.genSubTemplateCode(item)} 
          </Crud>`;
        str += `</el-tab-pane>`;
      });
      str += ` </el-tabs>
      </template>`;
    }
    return str;
  },
  // 生成模板代码
  genTemplateCode(treeData) {
    const str = `
        <Crud :dataModel="${treeData.modelName}M">
            ${this.genSubTemplateCode(treeData)}
        </Crud>
      `;
    return str;
  },
  // 简化依赖
  genSubMCode(subs, parentModelName) {
    let str = ``;
    subs &&
      subs.forEach((item) => {
        str += `
        const ${item.modelName}M=${parentModelName}M.${item.modelName}M
        ${this.genSubMCode(
          item.children,
          `'${parentModelName}.${item.modelName}'`
        )}
        `;
      });
    return str;
  },
  //   生成导出子模块ref变量
  genSubExportRefCode(subs) {
    let str = ``;
    subs &&
      subs.forEach((item) => {
        str += `
        ,
         ${item.modelName}M
         ${this.genSubExportRefCode(item.children)}
         `;
      });
    return str;
  },
  //  生成导出ref变量
  genExportRefCode(treeData) {
    return `{
        ${treeData.modelName}M
        ${this.genSubExportRefCode(treeData.children)}
      }
      `;
  },
  // 生成循环依赖代码
  genSubJsCode(subs) {
    let str = ``;
    subs &&
      subs.forEach((item) => {
        let injectStr = ''
        const field = item.fields.find((field)=>{
          return field.inject_key
        })
        if(field) {
          injectStr = `inject:['${field.field_name}','${field.inject_key}'],`
        }
        console.log(injectStr,2233445)
        str += `${item.modelName}M:useM(${item.modelName}${this.genSubJsCode(
          item.children
        )},{${injectStr}}),`;
      });
    return str;
  },

  // 生成js循环引用代码
  genJsCode(treeData) {
    let str = `
        const ${treeData.modelName}M = useM(${treeData.modelName},{
            ${this.genSubJsCode(treeData.children)}
        })
    `;
    str += this.genSubMCode(treeData.children, treeData.modelName);
    return str;
  },
};
