<template>
  <div>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>表单</h2>
        <el-divider></el-divider>
      </div>
      <dyForm :fields="fields" v-model="formData"> </dyForm>
    </el-card>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>值</h2>
        <el-divider></el-divider>
      </div>
      <pre> {{ JSON.stringify(formData, null, 4) }}</pre>
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
import dyForm from "components/base/dyForm/index.vue";
let formData = reactive({});
const fields = [
  {
    name: "name",
    inputType: "input",
    label: "姓名",
    useScene: "*",
    inputOptions: {
      placeholder: "请输入姓名",
    },
  },
  {
    name: "address",
    inputType: "textarea",
    label: "住址",
    useScene: "*",
    inputOptions: {
      placeholder: "请输入住址",
    },
  },
  {
    name: "sexId",
    inputType: "select",
    label: "性别",
    useScene: "*",
    inputOptions: {
      placeholder: "请选择性别",
      list: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 2,
          label: "女",
        },
      ],
    },
  },
];
</script>
<style scoped lang="less">
.test-card + .test-card {
  margin-top: 16px;
}
</style>
