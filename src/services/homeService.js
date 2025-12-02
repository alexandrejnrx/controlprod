import { tokenService } from '@/services/tokenService.js'
import router from '@/router/index.js'

export function logout() {
  tokenService.removeToken()
  router.push('/')
}
