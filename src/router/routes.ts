import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "浏览题目",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "管理员可见",
    component: () => import("@/views/AdminView.vue"),
    meta: {
      access: "canAdmin",
    },
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: () => import("@/views/AdminView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404Page.vue"),
  },
  {
    path: "/about",
    name: "关于我的",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
