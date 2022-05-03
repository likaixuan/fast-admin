<template>
  <div>
    {{ModuleM.queryParams}}
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
                <Crud
                  :dataModel="ModuleM.ModuleDmM"
                  @formChange="onModuleDmChange"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="模块访问授权"> </el-tab-pane>
        </el-tabs>
      </template>
    </Crud>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import useM from "@/hooks/useM.js";
import Module from "@/model/Module";
import ModuleDm from "@/model/ModuleDm";
import DataModel from "@/model/DataModel";
import Crud from "components/bus/crud/index.vue";
import {
  DownOutlined,
  UnorderedListOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";

// 初始化
const DataModelM = useM(DataModel);

// 构建参数
let ModuleM = useM(Module, {
  ModuleDmM: useM(ModuleDm, {
    isTree: true,
    isShowEditPanel: true,
    canActions: {
      back: false,
    },
  }),
});

// 挂载钩子
ModuleM.mountHook("beforeShowEditPanel", async function (options) {
  ModuleM.ModuleDmM.treeData = [];
  if (options.addParams) {
    if (options.addParams.module_type === Module.MODULE_TYPE_MODULE) {
      await Promise.all([ModuleM.ModuleDmM.findTree(), DataModelM.findAll()]);
      ModuleM.ModuleDmM.updateFieldMap.data_model_id.options.list =
        DataModelM.tableData;
    }
  }
  console.log(options, 5555);
});

ModuleM.mountHook("afterShowEditPanel", async function () {
  console.log(888888);
});

const onModuleDmChange = (...args) => {
  const { scene, name, value } = args[0];
  if (scene === "update" && name === "data_model_id") {
    const currentModel = DataModelM.tableData.find((item) => {
      return item.data_model_id === value;
    });
    console.log(currentModel, 5555);
    if (currentModel) {
      ModuleM.ModuleDmM.updateParams.module_dm_name =
        currentModel.data_model_name;
    }
  }
};

const treeData = computed(() => {
  return [
    {
      module_dm_name: ModuleM.updateParams.module_name,
      key: 1,
      isRoot: true,
      children: ModuleM.ModuleDmM.treeData,
    },
  ];
});

// 加载树形module
ModuleM.findTree().then(() => {
  // ModuleM.queryFieldMap.p_module_id.options.list = ModuleM.treeData;

  ModuleM.setFieldOptions('p_module_id',ModuleM.treeData)
});

// 选择树节点
const onSelectTreeNode = (...args) => {
  const { node } = args[1];
  if (node.isRoot) {
    ModuleM.ModuleDmM.updateParams = {};
  } else {
    ModuleM.ModuleDmM.updateParams = {
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
      ModuleM.ModuleDmM.updateParams = {
        [ModuleDm.parentIdName]: id,
      };
    } else {
      ModuleM.ModuleDmM.updateParams = {};
    }
  } else if (key === "remove") {
    ModuleM.ModuleDmM.remove({
      record: {
        [ModuleDm.primaryKey]: id,
      },
    }).then((res) => {
      if (id === ModuleM.ModuleDmM.updateParams.module_dm_id) {
        ModuleM.ModuleDmM.updateParams = {};
      }
    });
  }
  console.log(args, 45545);
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
