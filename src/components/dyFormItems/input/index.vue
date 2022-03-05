<template>
  <a-form-item :label="info.label" :name="info.name" :rules="info.rules || []">
    <a-input v-model:value="val" :placeholder="info.options && info.options.placeholder" @change="onValChange" />
  </a-form-item>
</template>
<script setup>
import { ref } from "vue";
let val = ref("");
const props = defineProps({
  info: Object,
});

const emit = defineEmits(["change"]);
const onValChange = (e) => {
  emit("change", val.value);
};
</script>
<style lang="less" scoped></style>
