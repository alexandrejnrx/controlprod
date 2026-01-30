<template>
  <div class="container">
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
          <input type="password" id="password" v-model="password" :disabled="authStore.isLoading" />
        </div>

        <div class="error-message">
          <span>{{ error }}</span>
        </div>
      </form>

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
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const error = ref('')

watch([username, password], () => {
  error.value = ''
})

async function handleLogin() {
  const isValid = validateInputs(username.value, password.value)

  if (!isValid) return

  await authStore.login(username.value, password.value)

  if (!authStore.isError) {
    clearFields()
  }
}

function validateInputs(username, password) {
  error.value = ''

  if (!username) {
    error.value = 'Informe um nome de usuário para continuar.'
    return false
  }

  if (!password) {
    error.value = 'Informe uma senha para continuar.'
    return false
  }

  return true
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
  background-color: #e5e7eb;
}

.login-content {
  width: 100%;
  max-width: 350px;
  background-color: var(--primary-color);
  border-radius: 10px;
  overflow-y: hidden;
  border: 1px solid #000000ff;
}

h2 {
  text-align: center;
  margin: 0;
}

.input-field {
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem 0 0.5rem;
  padding-top: 16px;
}

.input-field input {
  border: none;
  outline: none;
  padding: 0.5rem 0.5rem;
}

.input-field input:disabled {
  cursor: not-allowed;
}

#username {
  border-bottom: 1px solid var(--border-color);
}

.login-footer {
  display: flex;
  justify-content: center;
}

.login-btn {
  color: #ffffff;
  border: none;
  background-color: var(--btn-primary-color);
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.5rem 0 0.5rem 0;
}

.login-btn:disabled {
  cursor: not-allowed;
}

.error-message {
  display: flex;
  justify-content: center;
}

.error-message span {
  color: #ff0000;
}
</style>
