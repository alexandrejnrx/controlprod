import api from '@/services/api.js'
import { tokenService } from '@/services/tokenService.js'
import router from '@/router/index.js'

export async function login(username, password) {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    })

    tokenService.saveToken(response.data.token)
    await router.push('/home')

    return { success: true }
  } catch (error) {
    console.log('Erro ao tentar realizar login', error)

    return { success: false }
  }
}
