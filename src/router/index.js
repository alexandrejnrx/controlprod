import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/LoginVue.vue'
import HomeVue from '@/views/HomeVue.vue'
import ProductionVue from '@/views/ProductionVue.vue'
import { tokenService } from '@/services/tokenService.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue,
      meta: { requiresAuth: false },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeVue,
      meta: { requiresAuth: true },
    },
    {
      path: '/production/:productTypeId',
      name: 'production',
      component: ProductionVue,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = tokenService.getToken()
  const isAuthenticated = !!token

  if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    if (to.name === 'login' && isAuthenticated) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router
