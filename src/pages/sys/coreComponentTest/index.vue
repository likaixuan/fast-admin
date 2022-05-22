<template>
  <el-tabs type="border-card">
    <el-tab-pane label="动态表单">
      <el-tabs tab-position="right">
        <el-tab-pane label="TC1 渲染表单项">
          <dyFormTc1 />
        </el-tab-pane>
        <el-tab-pane label="TC2 统一存取值"> <dyFormTc2 /> </el-tab-pane>
        <el-tab-pane label="TC3 表单项禁用"> <dyFormTc3 /> </el-tab-pane>
        <el-tab-pane label="TC4 表单联动"> <dyFormTc4 /> </el-tab-pane>
        <el-tab-pane label="TC5 表单验证"> <dyFormTc5 /> </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="通用表格">
      <el-tabs tab-position="right">
        <el-tab-pane label="TC1 渲染表格">
          <dyTable1 />
        </el-tab-pane>
        <el-tab-pane label="TC2 自定义列">
          <dyTable2 />
        </el-tab-pane>
        <el-tab-pane label="TC3 标签化显示"> <dyTable3 /></el-tab-pane>
        <el-tab-pane label="TC4 内容过滤"> <dyTable4 /></el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "coreComponentTest",
};
</script>
<script setup>
import dyFormTc1 from "./dyForm/tc1.vue";
import dyFormTc2 from "./dyForm/tc2.vue";
import dyFormTc3 from "./dyForm/tc3.vue";
import dyFormTc4 from "./dyForm/tc4.vue";
import dyFormTc5 from "./dyForm/tc5.vue";

import dyTable1 from "./dyTable/tc1.vue";
import dyTable2 from "./dyTable/tc2.vue";
import dyTable3 from "./dyTable/tc3.vue";
import dyTable4 from "./dyTable/tc4.vue";

import useM from "@/hooks/useM.js";
import Crud from "components/bus/crud/index.vue";
import Article from "@/model/Article.js";
const ArticleM = useM(Article);
</script>
<style lang="less" scoped></style>
