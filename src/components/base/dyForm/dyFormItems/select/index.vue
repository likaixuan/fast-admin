<template>
  <a-form-item :label="info.label" :name="info.name">
    <a-select
       v-model:value="formData[name]"
      :placeholder="info.options.placeholder"
      @change="onValChange"
    >
      <template v-if="info.options.list">
        <a-select-option
          :value="option[valueName]"
          v-for="option in info.options.list"
          >{{ option[labelName] }}</a-select-option
        >
      </template>
    </a-select>
  </a-form-item>
</template>
<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  info: Object,
  name: String,
  dataModel: Object,
  fieldMap: Object,
  formData: Object,
});
let { valueName = "value", labelName = "label" } = props.info.options;

const name = props.info.name;
const link = props.info.options && props.info.options.link;

const emit = defineEmits(["change"]);
const onValChange = (e) => {
  if (link && link.change) {
    link.change(props.formData, props.fieldMap, props.dataModel);
  }
  emit("change", props.formData[name]);
};
</script>
<style lang="less" scoped></style>
