<template>
  <div>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>操作</h2>
        <el-divider></el-divider>
      </div>
      <div>
        <el-button @click="disableName" type="warning">禁用姓名</el-button>
        <el-button @click="useName" type="primary">启用姓名</el-button>

        <el-button @click="disableAll" type="danger">禁用全部</el-button>
        <el-button @click="useAll" type="success">解除全部禁用</el-button>
      </div>
    </el-card>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>表单</h2>
        <el-divider></el-divider>
      </div>
      <dyForm :fields="fields" v-model="formData" :disabled="disabled">
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
import { ref, reactive } from "vue";
import dyForm from "components/base/dyForm/index.vue";
let formData = ref({});
let disabled = ref(false);
const fields = reactive([
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
]);

const disableName = () => {
  fields[0].inputOptions.disabled = true;
};
const useName = () => {
  fields[0].inputOptions.disabled = false;
};

const disableAll = () => {
  disabled.value = true;
};
const useAll = () => {
  fields[0].inputOptions.disabled = false;

  disabled.value = false;
};
</script>
<style scoped lang="less">
.test-card + .test-card {
  margin-top: 16px;
}
</style>
