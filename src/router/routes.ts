import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    meta: {
      hideInMenu: true,
    },
    component: () => import("@/layouts/UserLayout.vue"),
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: () => import("@/views/user/UserLoginView.vue"),
      },
      {
        path: "/user/register",
        name: "注册",
        component: () => import("@/views/user/UserRegisterView.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "浏览题目",
    component: HomeView,
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: () => import("@/views/question/AddQuestionView.vue"),
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: () => import("@/views/question/ManageQuestionView.vue"),
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },
  },
  {
    path: "/admin",
    name: "管理员可见",
    component: () => import("@/views/AdminView.vue"),
    meta: {
      access: ACCESS_ENUM.ADMIN,
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
    // meta: {
    //   hideInMenu: true,
    // },
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
