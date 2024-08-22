import { createRouter, createWebHistory  } from 'vue-router'
import { useUserStore } from '../stores'
const routes = [
  {
    path: '/',
    component: () => import('../views/layout/layoutContainer.vue'),
    redirect: '/article/manage',
    children: [
      {
        path: '/article/manage',
        component: () => import('../views/article/articleManage.vue')
      },
      {
        path: '/article/channel',
        component: () => import('../views/article/articleChannel.vue')
      },
      {
        path: '/myself/myself',
        component: () => import('../views/myself/myself.vue')
      },
      {
        path: '/password/password',
        component: () => import('../views/password/password.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue'),
  }
]

const router = createRouter({
  // history: createWebHistory(),    // 使用history模式
  history: createWebHistory(),	 // 使用hash模式
  routes
})


router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})
export default router
