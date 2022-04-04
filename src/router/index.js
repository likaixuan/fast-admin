import { createRouter, createWebHashHistory } from "vue-router";
const login = () => import("@/pages/login.vue");
const module = () => import("@/pages/sys/module/index.vue");
const dataModel = () => import("@/pages/sys/dataModel/index.vue");
const test = () => import("@/pages/sys/test/index.vue");

const layout = () => import("@/pages/layout.vue");


const routes = [
  {
    path: "/",
    redirect:"/test",
    component: layout,
    children: [
      {
        path: "/module",
        component: module,
      },
      {
        path: "/dataModel",
        component: dataModel
      },
      {
        path: "/test",
        component: test
      }
    ],
  },
  {
    path: "/login",
    component: login,
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
