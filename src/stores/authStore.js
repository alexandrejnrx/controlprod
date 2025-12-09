import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const error = ref(null)

  function setLoading(value) {
    isLoading.value = value
  }

  function clearError() {
    error.value = null
  }

  return {
    isLoading,
    error,
    setLoading,
    clearError,
  }
})
