<template>
  <div>
    <Crud :dataModel="DataModelM"> </Crud>
  </div>
</template>
<script setup>
import useM from "@/hooks/useM.js";
import DataModel from "@/model/DataModel";
import Module from "@/model/Module";
import Crud from "components/bus/crud/index.vue";
let DataModelM = useM(DataModel, {
  SonM: useM(Module, {
    isShowQueryPanel: false,
    buttonSize: "small",
  }),
});
</script>
<style lang="less" scoped></style>
