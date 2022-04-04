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
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === '_action'">
        <!-- <a-button> -->
        <form-outlined @click="dataModel.showEditPanel({
          addParams:record
        })" />
        <!-- </a-button> -->
      </template>
      <!-- 常规 -->
      <template v-else>
        {{ record[column.dataIndex] }}
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { defineProps, computed } from "vue";
import { FormOutlined } from "@ant-design/icons-vue";
import { Item } from "ant-design-vue/lib/menu";
const props = defineProps({
  dataModel: Object,
});

const columns = computed(() => {
  const listFieldMap = props.dataModel.listFieldMap;
  let columns = Object.keys(listFieldMap)
    .filter((name) => {
      return listFieldMap[name].canUse !== false;
    })
    .map((name) => {
      let item = {
        title: listFieldMap[name].label,
        dataIndex: listFieldMap[name].name,
      };
      if (listFieldMap[name].width) {
        item.width = listFieldMap[name].width;
      }
      return item;
    });
  if (!listFieldMap._action) {
    columns.unshift({
      title: "操作",
      dataIndex: "_action",
      width: 60,
      align: "center",
    });
  }
  return columns;
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
