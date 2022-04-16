<template>
  <div>
    <Crud :dataModel="RoleM">
    </Crud>
  </div>
</template>
<script setup>
import useM from "@/hooks/useM.js";
import Crud from "components/bus/crud/index.vue";
import Role from "@/model/Role.js"
const RoleM = useM(Role)

</script>
<style lang="less" scoped></style>
