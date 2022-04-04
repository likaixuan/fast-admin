<template>
  <div class="curd">
    <dyForm :dataModel="dataModel" name="query" v-if="dataModel.isShowQueryPanel"></dyForm>
    <!-- 操作区域 -->
    <div class="btn-panel">
      <a-button :size="dataModel.buttonSize" @click="findOrFindAll">查询</a-button>
      <a-button :size="dataModel.buttonSize" type="primary" @click="dataModel.showEditPanel()"
        >新增</a-button
      >
      <a-button :size="dataModel.buttonSize" type="primary" danger @click="dataModel.remove()"
        >批量删除</a-button
      >
    </div>
    <!-- 表格 -->
    <dyTable :dataModel="dataModel"></dyTable>

    <!-- 编辑面板  -->
    <div class="curd-edit-panel" v-if="dataModel.isShowEditPanel">
      <!-- <a-divider /> -->
      <a-space>
        <a-button @click="dataModel.isShowEditPanel = false" :size="dataModel.buttonSize">返回</a-button>
        <a-button
          type="primary"
          @click="dataModel.save()"
          :loading="dataModel.isShowEditLoading" :size="dataModel.buttonSize"
          >保存</a-button
        ></a-space
      >
      <div class="edit-form-wrapper">
        <dyForm :dataModel="dataModel" name="update"></dyForm>
      </div>
      <div style="margin-top:24px;">
      <slot name="editPanelBottom"> </slot>

      </div>
    </div>
    <!-- 编辑 -->
    <!-- <a-modal
      v-model:visible="dataModel.isShowEditPanel"
      :title="dataModel.editPanelTitle"
      :width="dataModel.dialogWidth"
      wrap-class-name="full-modal"
      :footer="null"
    >  
    <div class="edit-panel-content-wrapper"></div>
      <a-spin :spinning="dataModel.isShowEditLoading">
        <a-space>
          <a-button @click="dataModel.isShowEditPanel = false">取消</a-button>
          <a-button
            type="primary"
            @click="dataModel.save()"
            :loading="dataModel.isShowEditLoading"
            >保存</a-button
          >
        </a-space>
        <div class="edit-form-wrapper">
          <dyForm :dataModel="dataModel" name="update"></dyForm>
        </div>
        <slot name="editPanelBottom"> </slot>
      </a-spin>
    </a-modal> -->
  </div>
</template>
<script setup>
import dyForm from "components/base/dyForm/index.vue";
import dyTable from "components/base/dyTable/index.vue";
import { defineProps } from "vue";
const props = defineProps({
  dataModel: Object,
});
const findOrFindAll = () => {
  if (props.dataModel.isPage) {
    props.dataModel.find();
  } else {
    props.dataModel.findAll();
  }
};
findOrFindAll();
</script>
<style lang="less">
.curd {
  // position: absolute;
  // top: 0px;
  // bottom: 0px;
  // left: 0px;
  // right: 0px;
  // padding: 24px 32px;
  // overflow: hidden;
  // overflow-y: auto;
  // overflow-x: auto;
}
.btn-panel {
  margin: 16px 0px;
  .ant-btn {
    margin-right: 8px;
  }
}

.curd-edit-panel {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 999;
  padding: 24px 32px;
  background: white;
}

.edit-form-wrapper {
  margin-top: 16px;
}

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}

.edit-panel-content-wrapper {
  position: absolute;
  top: 55px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  // background:red;
}
</style>
