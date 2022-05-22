<template>
  <el-container class="layout-container" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <div
          style="height: 60px"
          @click="logOut"
          class="flex justify-center items-center"
        >
          <img
            src="/img/dog.jpg"
            alt=""
            style="height: 44px; border-radius: 50%"
            srcset=""
          />
        </div>
        <el-scrollbar>
          <!-- 目前最多支持三级 -->
          <el-menu :default-active="$route.path" router>
            <template v-for="menu in commonStore.menu" :key="menu.name">
              <!-- 首页需要特殊处理 -->
              <template v-if="menu.path === '/'">
                <el-menu-item :index="menu.children[0].path">{{
                  menu.children[0].meta.moduleName
                }}</el-menu-item>
              </template>
              <!-- 带有下级的菜单 -->
              <template v-else-if="menu.children && menu.children.length > 0">
                <el-sub-menu :index="menu.name">
                  <template #title>
                    <!-- <el-icon><message /></el-icon> -->
                    {{ menu.meta.moduleName }}
                  </template>
                  <template
                    v-for="subMenu in menu.children"
                    :key="subMenu.name"
                  >
                    <template
                      v-if="subMenu.children && subMenu.children.length > 0"
                    >
                      <el-sub-menu :index="subMenu.path">
                        <template #title>{{ subMenu.moduleName }}</template>
                        <el-menu-item
                          :index="leaf.path"
                          v-for="leaf in subMenu.children"
                          :key="leaf.name"
                        >
                          {{ leaf.meta.moduleName }}
                        </el-menu-item>
                      </el-sub-menu>
                    </template>
                    <template v-else>
                      <el-menu-item :index="subMenu.path">{{
                        subMenu.meta.moduleName
                      }}</el-menu-item>
                    </template>
                  </template>
                </el-sub-menu>
              </template>
              <template v-else>
                <el-menu-item :index="menu.path">{{
                  menu.meta.moduleName
                }}</el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-scrollbar>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="flex justify-between items-center">
        <div class="text-xl">野狗低代码</div>
        <div class="toolbar">
          <el-dropdown>
            <div style="display:flex;align-items:center;">
                 <el-image
              style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 8px;
              "
              src="/img/avatar.png"
              fit="cover"
            />
            <span>{{userStore.userInfo.real_name}}</span>
            </div>
         
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <span style="font-size: 14px">{{
            userStore.userInfo.userCname
          }}</span> -->
        </div>
      </el-header>

      <el-main>
        <el-container style="height: 100%;overflow: hidden;">
          <el-header style="padding: 0px">
            <el-row :gutter="16">
              <el-col :span="22">
                <el-tabs
                  :model-value="$route.path"
                  type="card"
                  class="demo-tabs"
                  @tab-click="handleTabClick"
                  @tab-remove="handleTabClose"
                >
                  <el-tab-pane
                    v-for="page in commonStore.cachedPageMap"
                    :key="page.name"
                    :label="page.meta.moduleName"
                    :name="page.path"
                    :closable="page.path !== '/index'"
                  >
                  </el-tab-pane>
                </el-tabs>
              </el-col>
              <el-col :span="2" style="display: flex; align-items: center">
                <el-button
                  :icon="Refresh"
                  circle
                  style="margin-right: 8px"
                  @click="commonStore.refreshPage"
                />
                <el-dropdown>
                  <el-button :icon="Setting" circle />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        :icon="Refresh"
                        @click="commonStore.refreshPage"
                        >重新加载</el-dropdown-item
                      >
                      <el-dropdown-item
                        :icon="Close"
                        @click="commonStore.closeCurrentPage"
                      >
                        关闭当前标签页
                      </el-dropdown-item>

                      <el-dropdown-item
                        divided
                        :icon="ArrowLeft"
                        @click="commonStore.closeToLeftPage"
                        :disabled="commonStore.isLeftEnd"
                      >
                        关闭左侧</el-dropdown-item
                      >
                      <el-dropdown-item
                        :icon="ArrowRight"
                        @click="commonStore.closeToRightPage"
                        :disabled="commonStore.isRightEnd"
                      >
                        关闭右侧</el-dropdown-item
                      >
                      <el-dropdown-item
                        divided
                        :icon="Switch"
                        @click="commonStore.closeOtherPage"
                      >
                        关闭其它</el-dropdown-item
                      >
                      <el-dropdown-item
                        :icon="SwitchButton"
                        @click="commonStore.closeAllPage"
                      >
                        全部关闭
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-header>
          <el-main style="position: relative;overflow: hidden;">
            <div class="page-container">
              <el-scrollbar>
                <router-view v-slot="{ Component }">
                  <keep-alive :include="commonStore.cachedPageNames">
                    <component :is="Component"></component>
                  </keep-alive>
                </router-view>
              </el-scrollbar>
            </div>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/modules/user";

import {
  Setting,
  ArrowLeft,
  ArrowRight,
  Refresh,
  Close,
  SwitchButton,
  Switch,
} from "@element-plus/icons-vue";
import { useCommonStore } from "../store/modules/common";
import { useRouter, useRoute } from "vue-router";

const commonStore = useCommonStore();
const router = useRouter();
const userStore = useUserStore();

const logout = () => {
  commonStore.restRoutes()
  userStore.setUserInfo(null)
  router.replace('/login');
};

const handleTabClick = (tab) => {
  if (tab.props.name !== commonStore.currentPath) {
    router.push(tab.props.name);
  }
};
const handleTabClose = (name) => {
  commonStore.removeCachedPage(name);
  // 关闭的当前页
  if (name === commonStore.currentPath) {
    const keys = Object.keys(commonStore.cachedPageMap);
    router.replace(commonStore.cachedPageMap[keys[keys.length - 1]].path);
  }
};
</script>

<style scoped>
.layout-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  min-width:1400px;
}

.page-container {
  position:absolute;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
  box-sizing:border-box;
  /* padding: 8px 24px; */
  overflow: hidden;
}
.layout-container .el-header {
  position: relative;
  /* background-color: var(--el-color-primary-light-7); */
  color: var(--el-text-color-primary);
}
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  /* background: var(--el-color-primary-light-8); */
}
.layout-container .el-menu {
  border-right: none;
}
.layout-container .el-main {
  padding: 0;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
