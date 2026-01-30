import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signIn } from '@/services/loginService.js'
import { tokenService } from '@/services/tokenService.js'
import router from '@/router/index.js'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const isAuthenticated = ref(false)
  const isError = ref(false)

  async function login(username, password) {
    isLoading.value = true
    isError.value = false

    try {
      const response = await signIn(username, password)
      tokenService.saveToken(response.token)
      isAuthenticated.value = true
      await router.push('/home')
    } catch (error) {
      isError.value = true
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    tokenService.removeToken()
    isAuthenticated.value = false
    isError.value = false
    router.push('/')
  }

  function restoreAuth() {
    const token = tokenService.getToken()

    if (token && !tokenService.isTokenExpired()) {
      isAuthenticated.value = true
    } else {
      tokenService.removeToken()
      isAuthenticated.value = false
    }
  }

  return {
    isLoading,
    isAuthenticated,
    isError,
    login,
    logout,
    restoreAuth,
  }
})
