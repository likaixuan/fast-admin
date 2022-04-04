<template>
  <div>
      <Crud :dataModel="DataModelM" />
  </div>
</template>
<script setup>
import useM from "@/hooks/useM.js";
import DataModel from "@/model/DataModel";
import Crud from "components/bus/crud/index.vue";
let DataModelM = useM(DataModel,{
});
</script>
<style lang="less" scoped>

</style>
