<template>
  <!-- <a-form-item :label="info.label" :name="name" :rules="info.rules || []">
    <a-cascader
      v-model:value="val"
      :placeholder="info.options && info.options.placeholder"
      :disabled="info.disabled"
      :options="info.options.list || []"
      :fieldNames="{
        label: info.options.labelName || 'label',
        value: info.options.valueName || 'value',
        children: info.options.childrenName || 'children',
      }"
      changeOnSelect
      @change="onValChange"
    />
  </a-form-item> -->
   <el-cascader :options="options" :props="props1" clearable />
</template>
<script setup>
import { defineProps, ref, watch } from "vue";
import { func } from "_vue-types@3.0.2@vue-types";

const props = defineProps({
  info: Object,
  name: String,
  dataModel: Object,
  fieldMap: Object,
  formData: Object,
});

let val = ref([]);

const name = props.info.name;
const link = props.info.options && props.info.options.link;

// 通过子节点路径找寻父节点路径
const searchTreePath = function (
  tree,
  id,
  idName = "value",
  childrenName = "children"
) {
  if (Array.isArray(tree)) {
    for (let item of tree) {
      if (item[idName] === id) {
        return [id];
      } else {
        let tempArr = searchTreePath(
          item[childrenName],
          id,
          idName,
          childrenName
        );
        if (tempArr.length > 0) {
          return [item[idName]].concat(tempArr);
        }
      }
    }
  } else if (tree && tree[idName] === id) {
    return [id];
  }
  return [];
};

// 监听表单变化 并根据该id设置val的路径
watch(
  () => props.formData[name],
  (a, b) => {
    if (!a) {
      val.value = [];
    } else {
      let arr = searchTreePath(
        props.info.options.list,
        a,
        props.info.options.valueName,
        props.info.options.childrenName
      );
      val.value = arr
    }
  },
  {
      immediate: true
  }
);

const emit = defineEmits(["change"]);
const onValChange = (e) => {
  if (link && link.change) {
    link.change(props.formData, props.fieldMap, props.dataModel);
  }
  if (e && e.length > 0) {
    props.formData[name] = e[e.length - 1];
  } else {
   delete props.formData[name]
  }
  emit("change", props.formData[name]);
};
</script>
<style lang="less" scoped></style>
