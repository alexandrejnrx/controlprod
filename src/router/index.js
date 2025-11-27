import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/LoginVue.vue'
import HomeVue from '@/views/HomeVue.vue'
import { useAuthStore } from '@/stores/authStore.js'

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
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  authStore.checkAuth()

  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = authStore.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    console.log('Redirecionando para Login - Usuário não autenticado')
    return next('/')
  }

  if (to.path === '/' && isAuthenticated) {
    console.log('Redirecionando para Home - Usuário já autenticado')
    return next('/home')
  }

  next()
})

export default router
