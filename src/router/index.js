import { createRouter, createWebHashHistory } from "vue-router";
const dev = () => import("@/pages/sys/dev/index.vue");
const login = () => import("@/pages/login.vue");
const layout = () => import("@/pages/layout.vue");
const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/dev",
        component: dev,
      },
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
