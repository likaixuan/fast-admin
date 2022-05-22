<template>
  <el-table :data="tableData" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column label="操作" v-if="showAction">
      <template #default="scope">
        <el-button size="small" @click="onUpdateBtnClick(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
    <el-table-column
      :prop="item.name"
      :label="item.label"
      v-bind="item.listOptions || {}"
      v-for="item in fields"
    >
      <template #default="scope">
        <slot :name="item.name" :rowData="scope.row">
          <template v-if="!item.listOptions || !item.listOptions.tagType">
            {{ contentFilter(item.listOptions && item.listOptions.contentFilter, scope.row, item.name) }}
          </template>
          <template v-else>
            <el-tag :type="item.listOptions.tagType" disable-transitions>{{
              contentFilter(
                item.listOptions.contentFilter,
                scope.row,
                item.name
              )
            }}</el-tag>
          </template>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  dataModel: Object,
  tableData: Array,
  fields: {
    type: Array,
    default() {
      return [];
    },
  },
  showAction:{
    type:Boolean,
    default:true
  }
});

const contentFilter = function (fn, rowData, name) {
  if (!fn) {
    return rowData[name];
  } else {
    return fn(rowData, name);
  }
};
const emit = defineEmits(["selectionChange",'onUpdateBtnClick']);
const handleSelectionChange = function (...args) {
  emit("selectionChange", ...args);
};
const onUpdateBtnClick = function (...args) {
  emit("onUpdateBtnClick", ...args);
};
</script>
