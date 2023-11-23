// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LoginStudent',
    component: () => import('@/views/student/Login.vue')
  },
  {
    path: '/student',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/main?id=:id',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/student/Home.vue'),
      },
      {
        path: '/account?id=:id',
        name: 'Account',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/student/MyAccount.vue'),
      },
    ],
  },
  {
    path: '/register',
    name: 'RegisterStudent',
    component: () => import('@/views/student/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
