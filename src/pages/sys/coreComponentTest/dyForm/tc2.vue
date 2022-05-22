<template>
  <div>
    <el-card shadow="always" class="test-card">
      <div slot="header">
        <h2>操作</h2>
        <el-divider></el-divider>
      </div>
      <div>
        <el-button @click="setTitle">设置姓名</el-button>
        <el-button @click="clearFormData" type="danger">清空</el-button>
        <el-button @click="setFormData" type="primary">统一设置</el-button>
      </div>
    </el-card>
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
import { ref } from "vue";
import dyForm from "components/base/dyForm/index.vue";
let formData = ref({});
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

const setTitle = ()=>{
    formData.value.name = 'bugli'

}
const clearFormData = ()=>{
    formData.value = {}
}

const setFormData = ()=>{
    formData.value = {
        name:'李凯旋',
        address:'河北水利电力学院',
        sexId:1
    }
}
</script>
<style scoped lang="less">
.test-card + .test-card {
  margin-top: 16px;
}
</style>
