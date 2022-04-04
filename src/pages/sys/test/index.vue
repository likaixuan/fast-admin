<template>
  <div>
    <Crud :dataModel="ArticleM">
      <template v-slot:editPanelBottom v-if="ArticleM.isUpdate">
         <Crud :dataModel="ArticleM.CommentM"></Crud>
      </template>
    </Crud>
  </div>
</template>
<script setup>
import useM from "@/hooks/useM.js";
import Article from "@/model/Article";
import Comment from "@/model/Comment";

import Crud from "components/bus/crud/index.vue";
let ArticleM = useM(Article, {
  CommentM: useM(Comment),
});
</script>
<style lang="less" scoped></style>
