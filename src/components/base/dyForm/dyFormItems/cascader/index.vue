<template>
  <el-cascader
    v-model="itemValue"
    v-bind="inputOptions"
    clearable
  />
</template>
<script setup>
import { optionProps } from "ant-design-vue/lib/vc-mentions/src/Option";
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
  const info = props.info
  return {
    clearable:true,
    ...info.inputOptions,
    options:info.inputOptions.list || [],
    props: Object.assign(
      {
        checkStrictly:true,
        emitPath:false,
        label: "label",
        value: "value",
        children: "children",
      },
      props.info.inputOptions.props || {}
    ),
  };
});

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

// 事件相关
const emit = defineEmits(["change", "update:modelValue"]);
let itemValue = computed({
  get: () => {
    // console.log(props.modelValue,42323)
    // if(!props.modelValue) {
    //   return []
    // } else {
    //   const inputOptions = props.info.inputOptions
    //   const arr=  searchTreePath(
    //     inputOptions.list,
    //     props.modelValue,
    //     inputOptions.props.value,
    //     inputOptions.props.children
    //   );
    //   console.log(arr,876)
    //   return arr
    // }
    return props.modelValue
  },
  set: (val) => {
    emit("update:modelValue", val);
  },
});

const onValChange = (val) => {
  emit("change", val);
};
</script>
<style lang="less" scoped></style>
