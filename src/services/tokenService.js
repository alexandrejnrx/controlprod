const tokenKey = 'auth_token'

export const tokenService = {
  saveToken(token) {
    localStorage.setItem(tokenKey, token)
  },

  getToken() {
    return localStorage.getItem(tokenKey)
  },

  removeToken() {
    localStorage.removeItem(tokenKey)
  },
}
