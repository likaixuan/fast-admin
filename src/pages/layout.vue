<template>
  <div class="layout">
    <div class="layout-header"></div>
    <div class="layout-middle">
      <div class="layout-aside">
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          style="width: 256px"
          mode="inline"
        >
          <a-sub-menu key="sys">
            <template #title>系统管理</template>
            <a-menu-item key="1">角色管理</a-menu-item>
            <a-menu-item key="2">模块管理</a-menu-item>
            <a-menu-item key="3">数据模型</a-menu-item>
            <a-menu-item key="4" @click="toPage('/dev')">开发</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="layout-content">
        <div class="page-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
let selectedKeys = ["4"];
let openKeys = ["sys"];

const toPage = (path) => {
  router.push(path);
};
</script>
<style scoped lang="less">
.layout {
  top: 0px;
  bottom: 0px;
  position: fixed;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  &-header {
    height: 80px;
    background: green;
  }

  &-middle {
    flex: 1;
    display: flex;
  }

  &-aside {
  }
  &-content {
    flex: 1;
    position: relative;
    .page-container {
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      overflow: hidden;
      overflow-y: auto;
      padding: 24px 32px;
    }
  }
}
</style>
