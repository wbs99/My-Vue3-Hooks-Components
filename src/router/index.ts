
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
  {
    path: '/home', component: () => import("../views/Home.vue"),
    children: [
      {
        path: '/home/:id',
        component: () => import("../views/First.vue"),
      }
    ]
  },
  { path: '/first', component: () => import("../views/First.vue") },
  { path: '/about', component: () => import("../views/About.vue") },
  { path: '/useLongPress', component: () => import("../demos/LongPressDemo.vue") },
  { path: '/CountDownButton', component: () => import("../demos/CountDownButton.vue") },
  { path: '/SwiperDemo', component: () => import("../demos/SwiperDemo.vue") },
  { path: '/BackTop', component: () => import('../components/BackTop.vue') },
  { path: '/bars', component: () => import('../components/Bars.vue') },
  { path: '/floatButton', component: () => import('../demos/FloatButtonDemo.vue') },
  { path: '/menuButton', component: () => import('../demos/MenuButtonDemo.vue') },
  { path: '/infiniteImage', component: () => import('../components/InfiniteImage.vue') },
  { path: '/longList', component: () => import('../demos/LongListDemo.vue') },
  { path: "/:pathMatch(.*)", component: () => import("../views/NotFound.vue") },
]
const history = createWebHashHistory()

export const router = createRouter({ history, routes })
