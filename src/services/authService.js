import { httpClient } from '@/api/client.js'

const TOKEN_KEY = 'auth_token'

export const authService = {
  async login(username, password) {
    const response = await httpClient.post('/auth/login', {
      username,
      password,
    })

    if (response.token) {
      this.saveToken(response.token)
    }

    return response
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
  },

  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  isAuthenticated() {
    return this.getToken() !== null
  },
}
