<template>
  <div class="curd">
    <div v-show="!dataModel.isShowEditPanel">
      {{ dataModel.queryFields }}
      <dyForm
        :dataModel="dataModel"
        :fields="queryFields"
        v-model="dataModel.queryParams"
        @change="onDyFormChange"
        v-if="dataModel.isShowQueryPanel"
      ></dyForm>
      <!-- 操作区域 -->
      <div class="btn-panel">
        <el-button :size="dataModel.buttonSize" @click="findOrFindAll"
          >查询</el-button
        >
        <el-button
          :size="dataModel.buttonSize"
          v-if="dataModel.canActions.add"
          type="primary"
          @click="dataModel.showEditPanel()"
          >新增</el-button
        >
        <el-button
          :size="dataModel.buttonSize"
          v-if="dataModel.canActions.remove"
          type="danger"
          danger
          @click="dataModel.remove()"
          >批量删除</el-button
        >
        <slot name="btnPanelEnd"> </slot>
      </div>
      <slot name="btnPanelAfter"> </slot>
      <!-- 表格 -->
      <dyTable
        v-loading="dataModel.isShowTableLoading"
        @onUpdateBtnClick="onUpdateBtnClick"
        @selectionChange="handleSelectionChange"
        :tableData="dataModel.tableData"
        :fields="listFields"
      ></dyTable>
      <!-- 分页 -->
      <div class="page-wrapper" v-if="dataModel.isPage"> 
        <el-pagination
          :page-size="pagination.pageSize"
          v-model:currentPage="pagination.current"
          layout="prev, pager, next"
          :total="pagination.total"
        />
      </div>
    </div>

    <!-- 编辑面板  -->
    <div class="curd-edit-panel" v-if="dataModel.isShowEditPanel">
      <!-- <a-divider /> -->
      <a-space>
        <el-button
          v-if="dataModel.canActions.back"
          @click="dataModel.isShowEditPanel = false"
          :size="dataModel.buttonSize"
          >返回</el-button
        >
        <el-button
          v-if="dataModel.canActions.save"
          type="primary"
          @click="dataModel.save()"
          :loading="dataModel.isShowEditLoading"
          :size="dataModel.buttonSize"
          >保存</el-button
        >
        <slot name="saveBtnAfter"> </slot>
        
        </a-space
      >
      <div class="edit-form-wrapper">
        <dyForm
          :dataModel="dataModel"
          :fields="updateFields"
          v-model="dataModel.updateParams"
          @change="onDyFormChange"
          v-if="dataModel.isUpdate"
        ></dyForm>
        <dyForm
          :dataModel="dataModel"
          :fields="createFields"
          v-model="dataModel.updateParams"
          @change="onDyFormChange"
          v-else
        ></dyForm>
      </div>
      <div style="margin-top: 8px">
        <slot name="updateFormAfter"> </slot>
      </div>
    </div>
    <!-- 编辑 -->
    <!-- <a-modal
      v-model:visible="dataModel.isShowEditPanel"
      :title="dataModel.editPanelTitle"
      :width="dataModel.dialogWidth"
      wrap-class-name="full-modal"
      :footer="null"
    >  
    <div class="edit-panel-content-wrapper"></div>
      <a-spin :spinning="dataModel.isShowEditLoading">
        <a-space>
          <el-button @click="dataModel.isShowEditPanel = false">取消</el-button>
          <el-button
            type="primary"
            @click="dataModel.save()"
            :loading="dataModel.isShowEditLoading"
            >保存</el-button
          >
        </a-space>
        <div class="edit-form-wrapper">
          <dyForm :dataModel="dataModel" name="update"></dyForm>
        </div>
        <slot name="editPanelBottom"> </slot>
      </a-spin>
    </a-modal> -->
  </div>
</template>
<script setup>
import dyForm from "components/base/dyForm/index.vue";
import dyTable from "components/base/dyTable/index.vue";
import { defineProps, defineEmits, computed } from "vue";
import useFields from "@/hooks/useFields";
const props = defineProps({
  dataModel: Object,
});

const { fields: queryFields } = useFields({
  fields: props.dataModel.fields,
  scene: "query",
});
const { fields: updateFields } = useFields({
  fields: props.dataModel.fields,
  scene: "update",
});
const { fields: createFields } = useFields({
  fields: props.dataModel.fields,
  scene: "create",
});
const { fields: listFields } = useFields({
  fields: props.dataModel.fields,
  scene: "list",
});

// 处理选中
const handleSelectionChange = function (selectedRowKeys) {
  console.log(selectedRowKeys, 453434);
  props.dataModel.selectedRowKeys = selectedRowKeys;
};

// 点击编辑
const onUpdateBtnClick = function (rowData) {
  props.dataModel.showEditPanel({
    addParams: rowData,
  });
};

// 分页
const pagination = computed(() => {
  const m = props.dataModel;
  if (m.isPage) {
    return {
      total: m.pageInfo.total,
      current: m.pageInfo.current,
      pageSize: m.pageInfo.pageSize,
    };
  } else false;
});
const findOrFindAll = () => {
  if (!props.dataModel.isTree) {
    if (props.dataModel.isPage) {
      props.dataModel.find();
    } else {
      props.dataModel.findAll()
    }
  } else {
    // props.dataModel.findTree();
  }
};
findOrFindAll();

const emit = defineEmits(["formChange"]);
const onDyFormChange = (...args) => {
  emit("formChange", ...args);
};
</script>
<style lang="less">
.curd {
  width:100%;
  // position: absolute;
  // top: 0px;
  // bottom: 0px;
  // left: 0px;
  // right: 0px;
  // padding: 24px 32px;
  // overflow: hidden;
  // overflow-y: auto;
  // overflow-x: auto;
}
.btn-panel {
  margin: 16px 0px;
  .ant-btn {
    margin-right: 8px;
  }
}

.curd-edit-panel {
  // position: absolute;
  // top: 0px;
  // bottom: 0px;
  // left: 0px;
  // right: 0px;
  // z-index: 999;
  // padding: 24px 32px;
  background: white;
}

.edit-form-wrapper {
  margin-top: 16px;
}

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}

.edit-panel-content-wrapper {
  position: absolute;
  top: 55px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  // background:red;
}

.page-wrapper {
  margin-top:16px;
  display:flex;
  justify-content:center;
}
</style>
