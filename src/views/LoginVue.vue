<template>
  <div class="container">
    <div class="login-container">
      <div class="login-header">
        <h2>Login</h2>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="input-field">
          <label for="username">Usuário</label>
          <input type="text" id="username" v-model="username" />
        </div>

        <div class="input-field">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" />
        </div>

        <div class="login-footer">
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/services/loginService.js'

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

.login-footer {
  display: flex;
  justify-content: center;
  height: 40px;
}

.login-footer button {
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
</style>
