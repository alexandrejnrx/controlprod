import axios from 'axios'
import { tokenService } from '@/services/tokenService.js'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login')

    if (error.response?.status === 401 && !isLoginRequest && window.location.pathname !== '/') {
      tokenService.removeToken()
      window.location.href = '/'
    }

    return Promise.reject(error)
  },
)

export default api
