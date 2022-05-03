<template>
  <el-select v-model="itemValue" v-bind="inputOptions" @change="onValChange">
    <el-option
      v-for="item in inputOptions.list"
      :key="item[inputOptions.valueName || 'value']"
      :label="item[inputOptions.labelName || 'label']"
      :value="item[inputOptions.valueName || 'value']"
    />
  </el-select>
</template>
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  info: Object,
  modelValue: {
    type: [String, Number],
    default() {
      return "";
    },
  },
});
// 默认值
const inputOptions = computed(() => {
  return {
    ...props.info.inputOptions,
  };
});


// 事件相关
const emit = defineEmits(["change", "update:modelValue"]);
let itemValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});

const onValChange = (val) => {
  console.log(val,44234234)
  emit("change", val);
};
</script>
<style lang="less" scoped></style>
