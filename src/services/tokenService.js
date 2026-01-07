const tokenKey = 'auth_token'

export const tokenService = {
  saveToken(token) {
    sessionStorage.setItem(tokenKey, token)
  },

  getToken() {
    return sessionStorage.getItem(tokenKey)
  },

  removeToken() {
    sessionStorage.removeItem(tokenKey)
  },
}
