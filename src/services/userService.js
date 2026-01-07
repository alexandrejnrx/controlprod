import api from '@/services/api.js'

export async function getCurrentUser() {
  try {
    const response = await api.get('/users/me')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao buscar usuário atual', error)
    return { success: false, error }
  }
}
