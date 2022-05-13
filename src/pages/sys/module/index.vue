<template>
  <div>
    <Crud :dataModel="ModuleM">
      <template
        v-slot:updateFormAfter
        v-if="
          ModuleM.isUpdate &&
          ModuleM.updateParams.module_type === Module.MODULE_TYPE_MODULE
        "
      >
        <el-tabs type="border-card">
          <el-tab-pane label="模块数据模型">
            <div class="module-dm-wrapper">
              <a-tree
                defaultExpandAll
                show-line
                :tree-data="treeData"
                @select="onSelectTreeNode"
              >
                <template #switcherIcon><down-outlined /></template>
                <template #icon="{ isRoot }">
                  <smile-outlined />
                </template>
                <template #title="{ module_dm_id, module_dm_name, isRoot }">
                  <a-dropdown :trigger="['contextmenu']">
                    <span>{{ module_dm_name }}</span>
                    <template #overlay>
                      <a-menu
                        @click="onClickTreeNodeRightMenu($event, module_dm_id)"
                      >
                        <a-menu-item key="add">新增数据模型</a-menu-item>
                        <a-menu-item key="remove" v-if="!isRoot"
                          >删除数据模型</a-menu-item
                        >
                      </a-menu>
                    </template>
                  </a-dropdown>
                </template>
              </a-tree>
              <div class="module-dm">
                <Crud :dataModel="ModuleDmM" @formChange="onModuleDmChange">
                  <template v-slot:saveBtnAfter>
                    <el-button
                      type="warning"
                      v-if="ModuleDmM.isUpdate"
                      @click="createModuleDmFields"
                      >创建字段</el-button
                    >
                  </template>
                  <template v-slot:updateFormAfter v-if="ModuleDmM.isUpdate">
                    <Crud :dataModel="ModuleDmFieldM"></Crud>
                  </template>
                </Crud>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="模块访问授权"> </el-tab-pane>
        </el-tabs>
      </template>
    </Crud>
  </div>
</template>
<script>
export default {
  name: "module",
};
</script>
<script setup>
import { ref, computed } from "vue";
import useM from "@/hooks/useM.js";
import Module from "@/model/Module";
import ModuleDm from "@/model/ModuleDm";
import ModuleDmField from "@/model/ModuleDmField";
import DataModel from "@/model/DataModel";
import DataModelField from "@/model/DataModelField";

import Crud from "components/bus/crud/index.vue";
import {
  DownOutlined,
  UnorderedListOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";

// 初始化
const DataModelM = useM(DataModel);

// 构建参数
const ModuleM = useM(Module, {
  ModuleDmM: useM(ModuleDm, {
    isTree: true,
    isShowEditPanel: true,
    canActions: {
      back: false,
    },
    ModuleDmFieldM: useM(ModuleDmField, {
      buttonSize:'small',
      inject: ["module_dm_id"],
    }),
    DataModelFieldM: useM(DataModelField, {
      inject: ["data_model_id"],
    }),
  }),
});

// 简写
const ModuleDmM = ModuleM.ModuleDmM;
const ModuleDmFieldM = ModuleDmM.ModuleDmFieldM;
const DataModelFieldM = ModuleDmM.DataModelFieldM;

// 挂载钩子
ModuleM.mountHook("beforeShowEditPanel", async function (options) {
  console.log(ModuleDmM.findTree, 123456);
  ModuleDmM.treeData = [];
  ModuleM.showTableLoading();
  try {
    if (options.addParams) {
      await Promise.all([ModuleDmM.findTree(), DataModelM.findAll()]);
    } else {
      await Promise.all([ModuleDmM.findTree()]);
    }
    ModuleM.hideTableLoading();
    // 设置 可以引用的数据模型
    ModuleDmM.setFieldOptions("data_model_id", DataModelM.tableData);
  } catch (err) {
    ModuleM.hideTableLoading();
    return Promise.reject(err);
  }
});

ModuleM.mountHook("afterShowEditPanel", async function () {
  console.log(888888);
});

// 模块数据模型改变
const onModuleDmChange = (...args) => {
  const { scene, name, value } = args[0];
  if (scene === "update" && name === "data_model_id") {
    const currentModel = DataModelM.tableData.find((item) => {
      return item.data_model_id === value;
    });
    console.log(currentModel, 5555);
    if (currentModel) {
      ModuleDmM.updateParams.module_dm_name = currentModel.data_model_name;
    }
  }
};

// 模块数据模型树形
const treeData = computed(() => {
  return [
    {
      module_dm_name: ModuleM.updateParams.module_name,
      key: 1,
      isRoot: true,
      children: ModuleDmM.treeData,
    },
  ];
});

// 加载树形module
ModuleM.findTree().then(() => {
  ModuleM.setFieldOptions("p_module_id", ModuleM.treeData);
});

// 选择树节点
const onSelectTreeNode = (...args) => {
  const { node } = args[1];
  if (node.isRoot) {
    ModuleDmM.updateParams = {};
  } else {
    ModuleDmM.updateParams = {
      module_dm_name: node.module_dm_name,
      module_dm_id: node.module_dm_id,
      module_dm_code: node.module_dm_code,
      module_id: node.module_id,
      p_module_dm_id: node.p_module_dm_id,
      data_model_id: node.data_model_id,
      create_time: node.create_time,
      update_time: node.update_time,
    };
  }
  console.log(args, 44444);
};
// 选择右键菜单
const onClickTreeNodeRightMenu = (...args) => {
  const [{ key }, id] = args;
  if (key === "add") {
    if (id) {
      ModuleDmM.updateParams = {
        [ModuleDm.parentIdName]: id,
      };
    } else {
      ModuleDmM.updateParams = {};
    }
  } else if (key === "remove") {
    ModuleDmM.remove({
      record: {
        [ModuleDm.primaryKey]: id,
      },
    }).then((res) => {
      if (id === ModuleDmM.updateParams.module_dm_id) {
        ModuleDmM.updateParams = {};
      }
    });
  }
};
// 创建模块数据模型字段
const createModuleDmFields = async () => {
  console.log(ModuleDmM.updateParams, 44444);
  await DataModelFieldM.findAll();
  await ModuleDmFieldM.findAll();

  const canAddFields = DataModelFieldM.tableData
    .filter(({ data_model_field_id: id }) => {
      return ModuleDmFieldM.tableData.every(({ data_model_field_id }) => {
        return data_model_field_id !== id;
      });
    })
    .map((item) => {
      return {
        data_model_field_id: item.data_model_field_id,
        module_dm_id:ModuleDmM.updateParams.module_dm_id , // 模块数据模型id 代表该字段主表
        data_model_field_id: item.data_model_field_id, // 引用的数据字段
        field_name:item.field_name,
        field_c_name:item.field_c_name,
        field_type:item.field_type,
        data_type:item.data_type,
        // can_create:0,
        // can_update:0,
        // can_query:0,
        // can_list:0,
      };
    });
  console.log(canAddFields, 667788);
};
</script>
<style lang="less" scoped>
.module-dm-wrapper {
  display: flex;
  .module-dm {
    margin-left: 24px;
    flex: 1;
  }
}
</style>
