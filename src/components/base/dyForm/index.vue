<template>
  <el-form :model="formData">
    <el-row :gutter="gutter" :justify="justify" :align="align" style="overflow">
      <template v-for="item in fields" :key="item.name">
        <el-col v-if="!!item.inputOptions" :span="item.span || 6">
          <el-form-item
            :label="item.label"
            :prop="item.name"
            :rules="item.rules || []"
          >
            <component
              :is="formMap[item.inputType]"
              v-model="formData[item.name]"
              :info="item"
              @change="onFormItemChange(item, $event)"
            ></component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>
<script setup>
import { formMap } from "./index.js";
import { defineProps, computed, toRefs } from "vue";
import { check } from "@/utils/util.js";
const props = defineProps({
  scene: String,
  modelValue: {
    type: Object,
    default() {
      return {};
    },
  },
  fields: {
    type: Array,
    default() {
      return [];
    },
  },
  gutter: {
    type: Number,
    default: 16,
  },
  justify: {
    type: String,
    default: "start",
  },
  align: {
    type: String,
    default: "top",
  },
});

const emit = defineEmits(["change", "update:modelValue"]);
let formData = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});

// 监听表单项变化

const onFormItemChange = (item, e) => {
  emit("change", {
    type: "dyFormChange",
    name: item.name,
    scene: props.name,
    value: e,
  });
};

const calcUseScene = (field, scene, customSceneMap, sceneParser) => {
  customSceneMap = customSceneMap || {};
  sceneParser =
    sceneParser ||
    function (scene, useScene, customSceneMap) {
      if (!useScene) {
        return false;
      }
      const symbolList = ["(", ")", "&", "|", "!"];
      let evalStr = "";
      let word = "";
      for (let c of useScene) {
        if (~symbolList.indexOf(c)) {
          if (word === "*") {
            evalStr += `true`;
          } else if (word !== "") {
            evalStr += `${scene === word || !!customSceneMap[word]}`;
            word = "";
          }
          evalStr += c;
        } else {
          word += c;
        }
      }
      if (word) {
        evalStr += `${scene === word || !!customSceneMap[word]}`;
      }
      return eval(evalStr);
    };
  if (check.isBoolean(field.canUse)) {
    return field.canUse;
  } else if (!field.useScene) {
    return false;
  } else {
    return sceneParser(scene, field.useScene, customSceneMap);
  }
};
</script>
<style lang="less" scoped></style>



let objectArray = []

let arr = objectArray.filter((item)=>{
  return item.id !==0
})

this.setData({
  array:objectArray.filter((item)=>{
  return item.id !==0
})
})