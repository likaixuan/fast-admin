<template>
  <dyForm
    :fieldMap="DataModel.queryFieldMap"
    v-model="DataModelM.queryParams"
    @change="onChange"
  ></dyForm>
  <div class="btn-panel">
    <a-button @click="DataModelM.find()">查询</a-button>
    <a-button type="primary" @click="DataModelM.showEditPanel()">新增</a-button>
    <a-button type="primary" danger @click="DataModelM.remove()">批量删除</a-button>
  </div>
  <dyTable :dataModel="DataModelM"></dyTable>
  <a-modal
    v-model:visible="DataModelM.isShowEditPanel"
    cancelText="取消"
    okText="保存"
    :title="DataModelM.editPanelTitle"
    width="800px"
    @ok="DataModelM.save()"
  >
    <dyForm
      :fieldMap="DataModel.updateFieldMap"
      v-model="DataModelM.editParams"
    ></dyForm>
  </a-modal>
</template>
<script setup>
import { reactive } from "vue";
import useM from "@/hooks/useM.js";
import DataModel from "@/model/DataModel";
import dyForm from "components/dyForm/index.vue";
import dyTable from "components/dyTable/index.vue";
let DataModelM = useM(DataModel);
const onChange = (res)=>{
  console.log(res,3223)
}
</script>
<style lang="less" scoped>
.btn-panel {
  margin: 16px 0px;
  .ant-btn {
    margin-right: 8px;
  }
}
</style>
