import useM from "@/hooks/useM.js";
import DataModel from "@/model/DataModel";
import ModuleDm from "@/model/ModuleDm";
import ModuleDmField from "@/model/ModuleDmField";
import { firstToUpperCase, underlineToHump } from "@/utils/util.js";
// 格式化数据模型数据 用于代码生成
const _formatModelData = async (treeData) => {
  let modelName = "";
  let tableName = "";
  let modelCname = treeData.module_dm_name;
  let primaryKey = "_id";
  const dataModelData = await DataModel.findAll({
    data_model_id: treeData.data_model_id,
  });
  tableName = dataModelData.data[0].table_name;
  modelName = firstToUpperCase(underlineToHump(tableName));
  const dataModelFieldData = await ModuleDmField.findAll({
    module_dm_id: treeData.module_dm_id,
  });
  const arr = [];
  if (treeData.children.length > 0) {
    for (let data of treeData.children) {
      let t = await _formatModelData(data);
      arr.push(t);
    }
  }
  return {
    modelName,
    tableName,
    modelCname,
    primaryKey,
    fields: dataModelFieldData.data,
    children: arr,
  };
};

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
        let injectStr = "";
        const field = item.fields.find((field) => {
          return field.inject_key;
        });
        if (field) {
          injectStr = `inject:['${field.field_name}','${field.inject_key}'],`;
        }
        console.log(injectStr, 2233445);
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

  // 加载模块数据模型
  /**
   * @params { module_id}
   */
  async getCode(module_id) {
    const ModuleDmM = useM(ModuleDm, {
      addQueryParams: {
        module_id,
      },
      ModuleDmFieldM: useM(ModuleDmField),
    });
    await ModuleDmM.findTree();
    const res = await _formatModelData(ModuleDmM.treeData[0]);
    return `{
      template:\`${this.genTemplateCode(res)}\`,
      setup() {
        // 模型代码
        ${this.genModelClassCode(res)}
        // JS 循环引用代码
        ${this.genJsCode(res)}
        return ${this.genExportRefCode(res)}
      }
    }
   `;
  },
};
