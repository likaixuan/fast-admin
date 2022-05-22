<template>
  <div>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>表格</h2>
        <el-divider></el-divider>
      </div>
      <dyTable :fields="fields" :tableData="tableData"> </dyTable>
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
  {
    name: "海燕",
    address: "辽宁",
    sexId: 1,
  }
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
    listOptions: {
      tagType: "success",
      contentFilter(rowData, name) {
        if (rowData[name] === 1) {
          return "男";
        } else {
          return "女";
        }
      },
    },
  },
];
</script>
<style scoped lang="less">
.test-card + .test-card {
  margin-top: 16px;
}
</style>
