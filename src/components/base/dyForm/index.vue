<template>
  <a-form
    :model="formData"
    name="basic"
    layout="inline"
  >
  <a-row :gutter="[16,16]" style="width:100%;">
    <a-col v-for="item in fieldMap" :span="6" :key="item.name">
       <component
        :is="formMap[item.type]"
        :info="item"
  
        :dataModel="dataModel"
        :formData="formData"
        :fieldMap="fieldMap"
        :name="name"
        @change="onFormItemChange(item, $event)"
        v-if="formMap[item.type] && !fieldMap[item.name].notShow"
      ></component>
    </a-col>
  </a-row>
    
  </a-form>
</template>
<script setup>
import { formMap } from "./index.js";
import { defineProps, computed, toRefs } from "vue";
const props = defineProps({
  name: String,
  dataModel: Object,
});
const fieldMap = computed(() => {
  return props.dataModel[props.name + "FieldMap"];
});
const formData = computed(() => {
  return props.dataModel[props.name + "Params"];
});

// 监听表单项变化
const emit = defineEmits(["change"]);
const onFormItemChange = (item, e) => {
  emit("change", {
    type: "dyFormChange",
    name: item.name,
    scene:props.name,
    value: e,
  });
};
</script>
<style lang="less" scoped>

// #components-form-demo-advanced-search .ant-form {
//   max-width: none;
// }
// #components-form-demo-advanced-search .search-result-list {
//   margin-top: 16px;
//   border: 1px dashed #e9e9e9;
//   border-radius: 2px;
//   background-color: #fafafa;
//   min-height: 200px;
//   text-align: center;
//   padding-top: 80px;
// }
// [data-theme='dark'] .ant-advanced-search-form {
//   background: rgba(255, 255, 255, 0.04);
//   border: 1px solid #434343;
//   padding: 24px;
//   border-radius: 2px;
// }
// [data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
//   border: 1px dashed #434343;
//   background: rgba(255, 255, 255, 0.04);
// }
</style>
