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
  background-color: var(--primary-color);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #d0d0d0;
}

.login-content {
  padding: 4px 8px 0 8px;
}

h2 {
  text-align: center;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.input-field {
  display: flex;
  flex-direction: column;
}

.input-field label {
  margin: 0.5rem 0 0.5rem 0;
}

.input-field input {
  border: none;
  outline: none;
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 0.5rem;
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
  background-color: #000000ff;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.5rem 0 0.5rem 0;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.6;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
