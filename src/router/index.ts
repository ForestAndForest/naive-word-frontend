import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home/",
    component: () => import("../view/Home.vue"),
    children: [],
  },
  {
    path: "/editor",
    component: () => import("../view/EditorView.vue"),
  },
  {
    path: "/demos",
    component: () => import("../view/Home.vue"),
  },
  {
    path: "/notes/:id?",
    component: () => import("../view/Notes.vue"),
  },
  {
    path: "/home/",
    component: () => import("../view/Home.vue"),
  },
  {
    path: "/user/:uid",
    component: () => import("../view/UserInfo.vue"),
  },
  {
    path: "/user/:uid/revise",
    component: () => import("../components/user/UserUpdateForm.vue"),
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: () => import(`../view/404.vue`),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes: routes,
});
