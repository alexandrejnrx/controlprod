import api from '@/services/api.js'
import { tokenService } from '@/services/tokenService.js'
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/authStore.js'

export async function login(username, password) {
  const authStore = useAuthStore()

  authStore.setLoading(true)
  authStore.clearError()

  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    })

    tokenService.saveToken(response.data.token)
    await router.push('/home')

    return { success: true }
  } catch (error) {
    console.error('Erro ao tentar realizar login', error)

    return { success: false }
  } finally {
    authStore.setLoading(false)
  }
}
