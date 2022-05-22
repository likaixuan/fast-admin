<template>
  <el-date-picker
    v-model="itemValue"
    v-bind="inputOptions"
    type="datetime"
    @change="onValChange"
  />
</template>
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  info: Object,
  modelValue: {
    type: String,
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
  emit("change", val);
};
</script>
<style lang="less" scoped></style>
