<template>
  <div>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>表格</h2>
        <el-divider></el-divider>
      </div>
      <dyTable :fields="fields" :tableData="tableData">
        <template v-slot:sexId="scope"> 
            {{scope.rowData.sexId ===1 ? '男' :'女'}}
        </template>
      </dyTable>
    </el-card>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>tableData</h2>
        <el-divider></el-divider>
      </div>
      <pre> {{ JSON.stringify(tableData, null, 4) }}</pre>
    </el-card>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>JSON fiedls</h2>
        <el-divider></el-divider>
      </div>
      <pre> {{ JSON.stringify(fields, null, 4) }}</pre>
    </el-card>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import dyTable from "components/base/dyTable/index.vue";
let formData = reactive({});
let tableData = [
  {
    name: "李凯旋",
    address: "河北沧州",
    sexId: 1,
  },
];
const fields = [
  {
    name: "name",
    label: "姓名",
  },
  {
    name: "address",
    label: "住址",
  },
  {
    name: "sexId",
    label: "性别",
  },
];
</script>
<style scoped lang="less">
.test-card + .test-card {
  margin-top: 16px;
}
</style>
