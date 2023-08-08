// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/incluir',
        name: 'Incluir',
        component: () => import('@/views/Incluir.vue'),
      },
      {
        path: '/editar/:id',
        name: 'Editar',
        component: () => import('@/views/Editar.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
