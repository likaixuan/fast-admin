<template>
  <div>
    <Crud :dataModel="DataModelM">
      <template v-slot:editPanelBottom v-if="DataModelM.isUpdate">
        <Crud :dataModel="DataModelM.DataModelFieldM"></Crud> </template
    ></Crud>
  </div>
</template>
<script setup>
import useM from "@/hooks/useM.js";
import DataModel from "@/model/DataModel";
import DataModelField from "@/model/DataModelField";
import Module from "@/model/Module";
import Crud from "components/bus/crud/index.vue";
import { message } from "ant-design-vue";
let DataModelM = useM(DataModel, {
  DataModelFieldM: useM(DataModelField, {
    isShowQueryPanel: false,
    buttonSize: "small",
  }),
});

// 重写保存方法
DataModelM.save = async () => {
  DataModelM.showEditLoading();
  try {
    const res = await DataModel.update({
      ...DataModelM.updateParams,
    });
    if (DataModelM.isUpdate) {
      message.success("保存成功");
    } else {
      message.success("创建成功");
    }

    DataModelM.updateParams = res.data;
    if (DataModelM.isPage) {
      await DataModelM.find();
    }
  } catch (err) {
    console.log(err, 12312123);
  }
  DataModelM.hideEditLoading();
};
</script>
<style lang="less" scoped></style>
