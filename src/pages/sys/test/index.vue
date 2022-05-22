<template>
  <div>
    <Crud :dataModel="ArticleM"> </Crud>
  </div>
</template>
<script>
export default {
  name: "test",
};
</script>
<script setup>
import useM from "@/hooks/useM.js";
import Crud from "components/bus/crud/index.vue";
import Article from "@/model/Article.js";
const ArticleM = useM(Article);
</script>
<style lang="less" scoped></style>
