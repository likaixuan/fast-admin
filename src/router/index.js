import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { useCommonStore } from "@/store/modules/common";
const login = () => import("@/pages/login.vue");
const index = () => import("@/pages/index.vue");
const test = () => import("@/pages/sys/test/index.vue");

const layout = () => import("@/pages/layout.vue");
const NotFound = () => import("@/pages/404.vue");

// 系统管理
const module = () => import("@/pages/sys/module/index.vue");
const role = () => import("@/pages/sys/role/index.vue");
const dataModel = () => import("@/pages/sys/dataModel/index.vue");
const user = () => import("@/pages/sys/user/index.vue");
export const routes = [
  {
    path: "/",
    redirect: "/index",
    name: "layout",
    component: layout,
    meta: {
      moduleName: "首页",
    },
    children: [
      {
        path: "/index",
        name: "index",
        component: index,
        meta: {
          moduleName: "首页",
        },
      },
    ],
  },
  {
    path: "/login",
    component: login,
    hidden: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    hidden: true,
  },
];

// 根据后台动态路由
export const dyModuleMap = [
  {
    path: "/module",
    component: module,
  },
  {
    path: "/role",
    component: role,
  },
  {
    path: "/dataModel",
    component: dataModel,
  },
  {
    path:"/user",
    component: user,

  }
].reduce((map, item) => {
  // 添加默认的name项 用于keep-alive include缓存所用
  map[item.path.slice(1)] = {
    name: item.path.slice(1),
    meta: {},
    ...item,
  };
  return map;
}, {});

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

// // 路由守卫
router.beforeEach(async (to, from, next) => {
  // canUserAccess() 返回 `true` 或 `false`
  const userStore = useUserStore();
  const commonStore = useCommonStore();

  if (to.fullPath === "/login") {
    next();
  }
  else if (!userStore.userInfo||!userStore.userInfo.token) {
    next('/login')
  }
  else {
    commonStore.addCachePage(to);
    next();
  }
});

export const initVueRouter = (app) => {
  app.use(router);
};
