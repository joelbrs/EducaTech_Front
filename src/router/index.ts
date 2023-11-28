// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/student/register',
    name: 'RegisterStudent',
    component: () => import('@/views/student/Register.vue')
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
      {
        path: '/student/classes?id=:id&idCourse=:idCourse',
        name: 'ClassesHomeStudent',
        component: () => import('@/views/student/ClassesHome.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/admin/Default.vue'),
    children: [
      {
        path: '/admin/main',
        name: 'HomeAdmin',
        component: () => import('@/views/admin/Home.vue'),
      },
      {
        path: '/admin/courses',
        name: 'HomeCoursesAdmin',
        component: () => import('@/views/admin/courses/Index.vue'),
      },
      {
        path: '/admin/courses/cadastrar',
        name: 'CadastrarCoursesAdmin',
        component: () => import('@/views/admin/courses/Cadastrar.vue'),
      },
      {
        path: '/admin/courses/detalhar?id=:id',
        name: 'DetalharCoursesAdmin',
        component: () => import('@/views/admin/courses/Detalhar.vue'),
      },
      {
        path: '/admin/modules',
        name: 'HomeModulesAdmin',
        component: () => import('@/views/admin/modules/Index.vue'),
      },
      {
        path: '/admin/modules/cadastrar',
        name: 'CadastrarModulesAdmin',
        component: () => import('@/views/admin/modules/Cadastrar.vue'),
      },
      {
        path: '/admin/modules/detalhar?id=:id',
        name: 'DetalharModulesAdmin',
        component: () => import('@/views/admin/modules/Detalhar.vue'),
      },
      {
        path: '/admin/classes',
        name: 'HomeClassesAdmin',
        component: () => import('@/views/admin/classes/Index.vue'),
      },
      {
        path: '/admin/classes/cadastrar',
        name: 'CadastrarClassesAdmin',
        component: () => import('@/views/admin/classes/Cadastrar.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
