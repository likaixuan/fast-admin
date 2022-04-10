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
import Crud from "components/bus/crud/index.vue";
import Article from "@/model/Article.js"
import CommentM from "@/model/Comment.js"
const ArticleM = useM(Article,{
  CommentM:useM(CommentM)
})

</script>
<style lang="less" scoped></style>
