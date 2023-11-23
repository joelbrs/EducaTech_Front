// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LoginStudent',
    component: () => import('@/views/student/Login.vue')
  },
  {
    path: '/student/register',
    name: 'RegisterStudent',
    component: () => import('@/views/student/Register.vue')
  },
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: () => import('@/views/admin/Login.vue')
  },
  {
    path: '/student',
    component: () => import('@/layouts/default/student/Default.vue'),
    children: [
      {
        path: '/student/main?id=:id',
        name: 'HomeStudent',
        component: () => import('@/views/student/Home.vue'),
      },
      {
        path: '/student/account?id=:id',
        name: 'AccountStudent',
        component: () => import('@/views/student/MyAccount.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/admin/Default.vue'),
    children: [
      {
        path: '/admin/main?id=:id',
        name: 'HomeAdmin',
        component: () => import('@/views/admin/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
