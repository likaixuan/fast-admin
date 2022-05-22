<template>
  <div>
    <Crud :dataModel="UserM">
    </Crud>
  </div>
</template>
<script>
  export default {
    name: 'user',
  }
</script>
<script setup>
import useM from "@/hooks/useM.js";
import Crud from "components/bus/crud/index.vue";
import User from "@/model/User.js"
const UserM = useM(User)

</script>
<style lang="less" scoped></style>
