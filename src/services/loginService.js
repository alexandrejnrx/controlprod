import api from '@/services/api.js'

export async function signIn(username, password) {
  const response = await api.post('/auth/login', {
    username,
    password,
  })

  return response.data
}
