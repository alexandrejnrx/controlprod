import { defineStore } from 'pinia'
import { authService } from '@/services/authService.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  actions: {
    async login(username, password) {
      this.loading = true
      this.error = null

      try {
        await authService.login(username, password)
        this.isAuthenticated = true
        return true
      } catch (error) {
        this.error = error.message || 'Login failed'
        this.isAuthenticated = false
        console.error('Login error:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      authService.logout()
      this.isAuthenticated = false
      this.error = null
    },

    checkAuth() {
      this.isAuthenticated = authService.isAuthenticated()
    },
  },
})
