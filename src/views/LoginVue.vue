<template>
  <div class="container">
    <div class="login-container">
      <div class="login-content">
        <div class="login-header">
          <h2>ControlProd</h2>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="input-field">
            <label for="username">Usuário</label>
            <input
              type="text"
              id="username"
              v-model="username"
              :disabled="authStore.isLoading"
              maxlength="20"
            />
          </div>

          <div class="input-field">
            <label for="password">Senha</label>
            <input
              type="password"
              id="password"
              v-model="password"
              :disabled="authStore.isLoading"
              maxlength="20"
            />
          </div>
        </form>
      </div>

      <div class="login-footer">
        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="login-btn"
          @click="handleLogin"
        >
          <span v-if="!authStore.isLoading">Entrar</span>
          <span v-else class="loading-content">Entrando...</span>
        </button>
      </div>
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
}

.login-container {
  width: 100%;
  max-width: 350px;
  background-color: var(--secondary-color);
  border-radius: 10px;
  overflow: hidden;
}

.login-content {
  padding: 0.25rem 0.5rem 0 0.5rem;
}

h2 {
  color: var(--bg-color);
  text-align: center;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.input-field {
  display: flex;
  flex-direction: column;
}

.input-field label {
  color: var(--bg-color);
  margin: 0.5rem 0 0.5rem 0;
}

.input-field input {
  border: none;
  outline: none;
  border-bottom: 1px solid var(--border-color);
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
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.5rem 0 0.5rem 0;
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
