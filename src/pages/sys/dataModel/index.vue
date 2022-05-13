<template>
  <div>
    <!-- 数据模型 -->
    <Crud :dataModel="DataModelM">
      <!-- 数据模型字段 -->
      <template v-slot:updateFormAfter v-if="DataModelM.isUpdate">
        <el-tabs type="border-card">
          <el-tab-pane label="字段管理">
            <Crud :dataModel="DataModelM.DataModelFieldM">
              <!-- 创建字段快捷选项 -->
              <template v-slot:btnPanelAfter>
                <el-card style="margin-bottom: 16px">
                  <a-space>
                    <el-button
                      size="default"
                      @click="showCreateFieldPanel('text')"
                      >创建文本</el-button
                    >
                    <el-button
                      size="default"
                      @click="showCreateFieldPanel('select')"
                      >创建下拉框</el-button
                    >
                    <el-button
                      size="default"
                      @click="showCreateFieldPanel('textarea')"
                      >创建文本域</el-button
                    >
                    <el-button size="default">创建富文本</el-button>
                    <el-button size="default">单图</el-button>
                    <el-button size="default">多图</el-button>
                    <el-button size="default">单文件</el-button>
                    <el-button size="default">多文件</el-button>
                    <el-button size="default">关联</el-button>
                  </a-space>
                </el-card>
              </template>

              <!-- select 状态 -->
              <template
                v-slot:updateFormAfter
                v-if="
                  DataModelM.DataModelFieldM.isUpdate &&
                  DataModelM.DataModelFieldM.updateParams.input_type ===
                    'select'
                "
              >
                <el-tabs type="card">
                  <el-tab-pane label="状态管理">
                       <Crud :dataModel="DataModelM.DataModelFieldM.DataModelFieldStateM" />
                  </el-tab-pane></el-tabs
                >
              </template>
            </Crud>
          </el-tab-pane>
        </el-tabs>
      </template></Crud
    >
  </div>
</template>
<script>
  export default {
    name: 'dataModel',
  }
</script>
<script setup>
import { createVNode } from "vue";
import useM from "@/hooks/useM.js";
import DataModel from "@/model/DataModel";
import DataModelField from "@/model/DataModelField";
import DataModelFieldState from "@/model/DataModelFieldState";

import Module from "@/model/Module";
import Crud from "components/bus/crud/index.vue";
import { message } from "ant-design-vue";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
let DataModelM = useM(DataModel, {
  DataModelFieldM: useM(DataModelField, {
    isShowQueryPanel: false,
    canActions: {
      add: false,
    },
    DataModelFieldStateM:useM(DataModelFieldState,{
      buttonSize:'small',
      isShowQueryPanel: false
    })
  }),
});

// 重写数据模型保存方法
DataModelM.save = async () => {
  const m = DataModelM;
  m.showEditLoading();
  try {
    const res = await DataModel.update({
      ...m.updateParams,
    });
    if (m.isUpdate) {
      message.success("保存成功");
    } else {
      message.success("创建成功");
    }

    m.updateParams = res.data;
    if (m.isPage) {
      await m.find();
    }
  } catch (err) {
    console.log(err, 12312123);
  }
  m.hideEditLoading();
};

/**
 * 数据模型字段相关
 */

// 重写数据模型字段保存方法
DataModelM.DataModelFieldM.save = async () => {
  const m = DataModelM.DataModelFieldM;
  m.showEditLoading();
  try {
    const res = await DataModelField.update({
      ...m.updateParams,
      ...m.pParams,
    });
    if (m.isUpdate) {
      message.success("保存成功");
    } else {
      message.success("创建成功");
    }

    m.updateParams = res.data;
    if (m.isPage) {
      await m.find();
    }
  } catch (err) {
    console.log(err, 12312123);
  }
  m.hideEditLoading();
};

// 重写数据模型字段删除方法
DataModelM.DataModelFieldM.remove = async () => {
  const m = DataModelM.DataModelFieldM;
  const selectedRowKeysLen = m.selectedRowKeys.length;
  if (selectedRowKeysLen === 0) {
    message.warning("请选中一条记录");
    return;
  }
  Modal.confirm({
    title: `提示`,
    icon: createVNode(ExclamationCircleOutlined),
    content: `当前共选中了${selectedRowKeysLen}条记录，您确定要删除吗？`,
    okText: "确定",
    okType: "danger",
    cancelText: "取消",
    async onOk() {
      m.showTableLoading();
      try {
        const res = await DataModelField.remove({
          ids: m.selectedRowKeys.join(","),
        });
        message.success("删除成功");
        m.hideTableLoading();
        m.findAll();
        return res;
      } catch (err) {
        m.hideTableLoading();
        return err;
      }
    },
    onCancel() {
      message.info("已取消删除");
    },
  });
};

// 新增
const showCreateFieldPanel = (type) => {
  DataModelM.DataModelFieldM.showEditPanel({
    addParams: {
      ...DataModelField.inputMap[type],
    },
  });
  console.log(type, 5454545);
};
</script>
<style lang="less" scoped></style>
