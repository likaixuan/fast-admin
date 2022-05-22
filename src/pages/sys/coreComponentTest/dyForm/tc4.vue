<template>
  <div>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>操作</h2>
        <el-divider></el-divider>
      </div>
      <div>
        <el-button @click="resetScene">重置场景</el-button>
        <el-button @click="setScene('create', true)" type="danger"
          >新增场景</el-button
        >
        <el-button @click="setScene('update', true)" type="primary"
          >编辑场景</el-button
        >
      </div>
    </el-card>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>表单</h2>
        <el-divider></el-divider>
      </div>
      <dyForm
        :fields="fields"
        v-model="formData"
        :inline="inline"
        :labelPostion="labelPosition"
      >
      </dyForm>
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
import { ref } from "vue";
import dyForm from "components/base/dyForm/index.vue";
import useFields from "../../../../hooks/useFields";
let formData = ref({});
let labelPosition = ref("right");
let inline = ref(false);
const { fields, setScene, resetScene } = useFields({
  fields: [
    {
      name: "name",
      inputType: "input",
      label: "姓名",
      useScene: "*",
      inputOptions: {},
    },
    {
      name: "address",
      inputType: "textarea",
      label: "住址",
      useScene: "*",
      inputOptions: {
        placeholder: "请输入内容",
      },
    },
    {
      name: "sexId",
      inputType: "select",
      label: "性别",
      useScene: "!create",
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
    {
      name: "create",
      inputType: "input",
      label: "新增可见",
      useScene: "create",
      disableScene: "update",
      inputOptions: {},
    },
    {
      name: "create",
      inputType: "input",
      label: "编辑可见",
      useScene: "update",
      inputOptions: {},
    },
  ],
});
</script>
<style scoped lang="less">
.test-card + .test-card {
  margin-top: 16px;
}
</style>
