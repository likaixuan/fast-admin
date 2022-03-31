<template>
  <a-form-item :label="info.label" :name="info.name">
    <a-select v-model:value="val" :placeholder="info.options.placeholder" @change="onValChange">
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
import { ref,defineProps } from "vue";
const props = defineProps({
  info: Object,
});
let val = ref();
let { valueName = "value", labelName = "label" } = props.info.options;

const emit = defineEmits(["change"]);
const onValChange = (e) => {
  emit("change", val.value);
};
</script>
<style lang="less" scoped></style>
