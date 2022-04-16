<template>
  <div>
      <Crud :dataModel="ModuleM" />
  </div>
</template>
<script setup>
import useM from "@/hooks/useM.js";
import Module from "@/model/Module";
import Crud from "components/bus/crud/index.vue";
// 构建参数
let ModuleM = useM(Module);

ModuleM.findTree().then(()=>{
  ModuleM.updateFieldMap.p_module_id.options.list = ModuleM.treeData
})
</script>

