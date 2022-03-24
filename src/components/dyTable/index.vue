<template>
  <a-table
    :dataSource="dataModel.tableData"
    :loading="dataModel.isTableLoading"
    :columns="columns"
  />
</template>
<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  dataModel: Object,
});
// let columns = Object.keys(props.dataModel.listFieldMap).map((item)=>{
//   let
//   return props.dataModel.listFieldMap[item]
// })

const columns = computed(() => {
  const listFieldMap = props.dataModel.listFieldMap;
  return Object.keys(listFieldMap).map((name) => {
    return {
      title: listFieldMap[name].label,
      dataIndex: listFieldMap[name].name,
      key: listFieldMap[name].name,
    };
  });
});

console.log(props.dataModel.tableData, 66666);
</script>
