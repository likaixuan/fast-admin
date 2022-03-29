<template>
  <div class="curd">
    <dyForm :dataModel="dataModel" name="query"></dyForm>
    <!-- 操作区域 -->
    <div class="btn-panel">
      <a-button @click="findOrFindAll">查询</a-button>
      <a-button type="primary" @click="dataModel.showEditPanel()"
        >新增</a-button
      >
      <a-button type="primary" danger @click="dataModel.remove()"
        >批量删除</a-button
      >
    </div>
    <!-- 表格 -->
    <dyTable :dataModel="dataModel"></dyTable>
    <!-- 编辑 -->
    <a-modal
      v-model:visible="dataModel.isShowEditPanel"
      :title="dataModel.editPanelTitle"
      :width="dataModel.dialogWidth"
    >
      <a-spin :spinning="dataModel.isShowEditLoading">
        <dyForm :dataModel="dataModel" name="update"></dyForm>
      
      </a-spin>
        <template #footer>
          <a-button  @click="dataModel.isShowEditPanel = false">取消</a-button>
          <a-button type="primary" @click="dataModel.save()" :loading="dataModel.isShowEditLoading">保存</a-button>
        </template>
    </a-modal>
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
<style lang="less" scoped>
.btn-panel {
  margin: 16px 0px;
  .ant-btn {
    margin-right: 8px;
  }
}
</style>
