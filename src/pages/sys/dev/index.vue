<template>
  <dyForm :fieldMap="DataModel.queryFieldMap" v-model="DataModelM.queryParams"></dyForm>
  {{DataModelM.queryParams}}
  <div class="btn-panel">
    <a-button @click="DataModelM.findAll">查询</a-button>
    <a-button type="primary" @click="DataModelM.showEditPanel">新增</a-button>
    <a-button type="primary" danger>删除</a-button>
  </div>
  <dyTable :dataModel="DataModelM"></dyTable>
   <a-drawer
      title="Basic Drawer"
      placement="bottom"
      height="100%"
      :closable="true"
      :visible="DataModelM.isShowEditPanel"
      :get-container="false"
      :style="{ position: 'absolute' }"
      @close="DataModelM.hideEditPanel"
    >
      <p>Some contents...</p>
    </a-drawer>
</template>
<script setup>
import { reactive } from "vue";
import useM from "@/hooks/useM.js";
import DataModel from "@/model/DataModel";
import dyForm from "components/dyForm/index.vue";
import dyTable from "components/dyTable/index.vue"
let DataModelM = useM(DataModel);


</script>
<style lang="less" scoped>
  .btn-panel {
    margin:16px 0px;
    .ant-btn {
      margin-right:8px;
    }
  }
</style>
