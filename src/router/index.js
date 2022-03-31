import { createRouter, createWebHashHistory } from "vue-router";
const login = () => import("@/pages/login.vue");
const module = () => import("@/pages/sys/module/index.vue");
const dataModel = () => import("@/pages/sys/dataModel/index.vue");
const layout = () => import("@/pages/layout.vue");


const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/module",
        component: module,
      },
      {
        path: "/dataModel",
        component: dataModel
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
