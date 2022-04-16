<template>
  <div class="layout">
    <div class="layout-header">
    <div class="layout-header-logo">
      <a-avatar :size="40" src="/img/dog.jpg" />
      <div class="layout-header-logo-name">野狗低代码</div>
    </div>
    <a-popover placement="bottom">
      <template #content>
        <div><a-button type="text"><template #icon><logout-outlined /></template>退出登录</a-button></div>
        <div><a-button type="text" block><template #icon><logout-outlined /></template>其他操作</a-button></div>
      </template>
      <div class="layout-header-account">
        <a-avatar src="/img/avatar.png" />
        <div class="layout-header-account-name">
          <span>admin </span>
          <a-space>
            <down-outlined :style="{ fontSize: '12px',fontWeight:400 }"/>
          </a-space>
        </div>
      </div>
    </a-popover>
     
    </div>
    <div class="layout-middle">
      <div class="layout-aside">
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          style="width: 256px"
          mode="inline"
          :inline-collapsed="collapsed"
        >
          <a-sub-menu key="sys">
            <template #title>系统管理</template>
            <a-menu-item key="1">角色管理</a-menu-item>
            <a-menu-item key="2" @click="toPage('/module')"
              >模块管理</a-menu-item
            >
            <a-menu-item key="3" @click="toPage('/dataModel')"
              >数据模型</a-menu-item
            >
            <a-menu-item key="4" @click="toPage('/test')">测试</a-menu-item>
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
import { ref, reactive } from "vue";
import { DownOutlined,LogoutOutlined } from '@ant-design/icons-vue';
const router = useRouter();
let collapsed = false;
let selectedKeys = ["4"];
let openKeys = ["sys"];

const toPage = (path) => {
  router.push(path);
};


const logo="https://himg.bdimg.com/sys/portraitn/item/e065bed5bba8b2bfc2e4f923";


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
    background: white;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div{
      padding:0 20px;
      display: flex;
      align-items: center;
    }
    &-logo{
      &-name{
        margin-left: 10px;
        font-size:24px;
        font-weight: 600;
        flex:1
      }
    }
    &-account{
      &-name{
        margin-left: 8px;
      }
    }


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
