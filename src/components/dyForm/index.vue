<template>
  <a-form :model="modelValue" name="basic" layout="inline">
    <template v-for="item in fieldMap">
      <component
        :is="formMap[item.type]"
        :info="item"
        @change="onFormItemChange(item,$event)"
        v-if="formMap[item.type]"
      ></component>
    </template>
  </a-form>
</template>
<script setup>
import { formMap } from "./index.js";
import { defineProps, reactive } from "vue";
const props = defineProps({
  fieldMap: Object,
  modelValue:Object
});
// 监听表单项变化
const emit = defineEmits(['update:modelValue','change'])
const onFormItemChange = (item,e) => {
    props.modelValue[item.name] = e
    emit('update:modelValue', props.modelValue)
    emit('change',{
        name:item.name,
        value:e
    })
};
</script>
<style lang="less" scoped></style>
