<template>
  <div class="container">
    <div class="login-container">
      <div class="login-header">
        <h2>Login</h2>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="input-field">
          <label for="username">Usuário</label>
          <input type="text" id="username" v-model="username" :disabled="authStore.isLoading" />
        </div>

        <div class="input-field">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" :disabled="authStore.isLoading" />
        </div>

        <div class="login-footer">
          <button type="submit" :disabled="authStore.isLoading" class="login-btn">
            <span v-if="!authStore.isLoading">Entrar</span>
            <span v-else>Entrando...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/services/loginService.js'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()

const username = ref('')
const password = ref('')

async function handleLogin() {
  const result = await login(username.value, password.value)

  if (!result.success) {
    clearFields()
  }
}

function clearFields() {
  username.value = ''
  password.value = ''
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 350px;
  background-color: var(--secondary-color);
  border-radius: 10px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 12px 40px rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
}

h2 {
  color: var(--bg-color);
  text-align: center;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.input-field label {
  color: var(--bg-color);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.input-field input {
  border: none;
  outline: none;
  border-bottom: 1px solid #d0d0d0;
  padding: 0.75rem 0.5rem;
  font-size: 1rem;
  background-color: transparent;
  transition: opacity 0.2s;
}

.input-field input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  display: flex;
  justify-content: center;
}

.login-btn {
  color: var(--bg-color);
  border: none;
  background-color: var(--secondary-color);
  cursor: pointer;
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
}

.login-btn:hover:not(:disabled) {
  background-color: #f2e9ff;
  opacity: 0.9;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
