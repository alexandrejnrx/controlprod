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

  isTokenExpired() {
    const token = this.getToken()

    if (!token) return true

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = payload.exp * 1000
      const now = Date.now()

      return now >= expirationTime
    } catch {
      return true
    }
  },
}
