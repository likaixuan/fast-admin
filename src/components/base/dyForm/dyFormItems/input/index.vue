<template>
  <a-form-item :label="info.label" :name="name" :rules="info.rules || []">
    <a-input
      v-model:value="formData[name]"
      :placeholder="info.options && info.options.placeholder"
      :disabled="info.disabled"
      @change="onValChange"
    />
  </a-form-item>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  info: Object,
  name: String,
  dataModel: Object,
  fieldMap: Object,
  formData: Object,
});
const name = props.info.name
const event = props.info.options && props.info.options.event;


const emit = defineEmits(["change"]);
const onValChange = (e) => {
  if (event && event.change) {
    event.change(props.formData, props.fieldMap, props.dataModel);
  }
  emit("change", props.formData[name]);
};
</script>
<style lang="less" scoped></style>
