<template>
  <a-table
    :rowKey="dataModel.primaryKey"
    :dataSource="dataModel.tableData"
    :loading="dataModel.isTableLoading"
    :columns="columns"
    :pagination="pagination"
    @change="onTableChange"
  />
</template>
<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  dataModel: Object,
});

const columns = computed(() => {
  const listFieldMap = props.dataModel.listFieldMap;
  return Object.keys(listFieldMap).map((name) => {
    return {
      title: listFieldMap[name].label,
      dataIndex: listFieldMap[name].name,
    };
  });
});

const pagination = computed(() => {
  const m = props.dataModel;
  if (m.isPage) {
    return {
      total: m.pageInfo.total,
      current: m.pageInfo.current,
      "page-size": m.pageInfo.pageSize,
    };
  } else false;
});

const onTableChange = (...args) => {
  if (args[0]) {
    props.dataModel.find({
      params: {
        current: args[0].current,
        pageSize: args[0].pageSize,
      },
    });
  }
};

console.log(props.dataModel.tableData, 66666);
</script>
