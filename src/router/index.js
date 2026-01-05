import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/LoginVue.vue'
import HomeVue from '@/views/HomeVue.vue'
import ProductionVue from '@/views/ProductionVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue,
      requirestAuth: false,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeVue,
      requirestAuth: true,
    },
    {
      path: '/production/:productTypeId',
      name: 'production',
      component: ProductionVue,
      requirestAuth: true,
    },
  ],
})

export default router
