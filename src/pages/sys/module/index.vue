<template>
  <div>
      <Crud :dataModel="ModuleM" />
  </div>
</template>
<script setup>
import useM from "@/hooks/useM.js";
import Module from "@/model/Module";
import Crud from "components/bus/crud/index.vue";
let ModuleM = useM(Module);
</script>
<style lang="less" scoped>

</style>
