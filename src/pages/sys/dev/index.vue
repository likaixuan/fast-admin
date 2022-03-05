<template>
  dev页面{{ formData }}
  <dyForm :fieldMap="fieldMap" v-model="formData"></dyForm>
</template>
<script setup>
import { reactive } from "vue";
import dyForm from "components/dyForm/index.vue";
const formData = reactive({name:222})
const fieldMap = {
  name: {
    name: "name",
    type: "input",
    label: "名称",
    rules:[{ required: true, message: 'Please input your username!',trigger:['change', 'blur'] }]

  },
  sexId: {
    name: "sexId",
    type: "select",
    label: "性别",
    options: {
      list: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 2,
        },
      ],
    },
  },
};
</script>
