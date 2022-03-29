<template>
  <a-table
    :rowKey="dataModel.primaryKey"
    :dataSource="dataModel.tableData"
    :loading="dataModel.isShowTableLoading"
    :columns="columns"
    :pagination="pagination"
    :row-selection="{
      selectedRowKeys: dataModel.selectedRowKeys,
      onChange: onSelectChange,
    }"
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

const onSelectChange = (selectedRowKeys) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  props.dataModel.selectedRowKeys = selectedRowKeys;
};

const onTableChange = (...args) => {
  // 分页改变
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
