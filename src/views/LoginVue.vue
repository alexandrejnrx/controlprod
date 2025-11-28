<template>
  <div class="container">
    <div class="login-container">
      <div class="login-header">
        <h2>Login</h2>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <label for="form.username">Usuário</label>
          <input type="text" v-model="form.username" :disabled="authStore.loading" />
        </div>

        <div class="input-field">
          <label for="form.password">Senha</label>
          <input type="password" v-model="form.password" :disabled="authStore.loading" />
        </div>

        <div class="submit-btn">
          <button type="submit" :disabled="authStore.loading">
            {{ authStore.loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginVue',

  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return { authStore, router }
  },

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },

  mounted() {
    if (this.authStore.isAuthenticated) {
      this.router.push('/home')
    }
  },

  methods: {
    async handleSubmit() {
      console.log('Tentando fazer login...')

      const success = await this.authStore.login(this.form.username, this.form.password)

      if (success) {
        console.log('Login realizado com sucesso')
        this.router.push('/home')
      } else {
        console.error('Erro ao realizar login')
        this.form.password = ''
      }
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  height: 200px;
  width: 100%;
  max-width: 400px;
  background-color: var(--secondary-color);
  border-radius: 10px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 12px 40px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--bg-color);
  text-align: center;
  padding-top: 10px;
  margin: 0;
}

.input-field {
  display: flex;
  flex-direction: column;
  padding: 0 10px 0 10px;
}

.input-field label {
  color: var(--bg-color);
  padding-top: 10px;
}

.input-field input {
  border: none;
  outline: none;
  border-bottom: 1px solid #d0d0d0;
  padding: 8px 4px;
}

.input-field input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn {
  display: flex;
  justify-content: center;
  height: 40px;
}

.submit-btn button {
  color: var(--bg-color);
  border: none;
  background-color: var(--secondary-color);
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 0 0 10px 10px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.submit-btn button:hover:not(:disabled) {
  background-color: #f2e9ff;
}

.submit-btn button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
