<template>
  <a-form :model="formData" name="basic" layout="inline">
    <template v-for="item in fieldMap">
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
    </template>
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
    type: "dyFromChange",
    name: item.name,
    value: e,
  });
};
</script>
<style lang="less" scoped></style>
