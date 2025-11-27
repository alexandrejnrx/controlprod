<template>
  <div class="container">
    <header class="header-container">
      <h1>ControlProd</h1>
      <button class="profile-btn" @click="handleLogout">Sair</button>
    </header>

    <main class="main-container">
      <h2>Bem-vindo!</h2>
      <div class="create-container">
        <div class="cards">
          Cliente
          <button class="create-btn">Cadastrar</button>
        </div>

        <div class="cards">
          Projetos
          <button class="create-btn">Cadastrar</button>
        </div>

        <div class="cards">
          Tipo de produto
          <button class="create-btn">Cadastrar</button>
        </div>

        <div class="cards">
          Produto
          <button class="create-btn">Cadastrar</button>
        </div>
      </div>

      <div class="products-container">
        <h3>Controle de Produção</h3>
        <div class="product-card">Teste</div>
      </div>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeVue',

  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return { authStore, router }
  },

  methods: {
    handleLogout() {
      console.log('Fazendo logout...')
      this.authStore.logout()
      this.router.push('/')
    },
  },
}
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: var(--secondary-color);
  padding: 0 10px;
}

h1 {
  color: var(--bg-color);
}

.profile-btn {
  background-color: var(--bg-color);
  border: none;
  cursor: pointer;
  color: var(--secondary-color);
  font-weight: bold;
  height: 40px;
  width: 80px;
  padding: 0 10px;
  border-radius: 5px;
  transition: opacity 0.3s;
}

.profile-btn:hover {
  opacity: 0.8;
}

.main-container {
  margin-top: 10vh;
  background-color: var(--bg-color);
}

h2 {
  color: var(--secondary-color);
  padding: 2rem;
}

.cards {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary-color);
  border-radius: 5px;
  margin: 10px;
  padding: 0 10px;
  height: 50px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 12px 40px rgba(0, 0, 0, 0.1);
}

.create-btn {
  background-color: var(--btn-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  height: 30px;
}

.create-btn:hover {
  opacity: 0.8;
}

.products-container {
  background-color: var(--secondary-color);
  min-height: 400px;
  padding: 2rem;
}

.product-card {
  background-color: var(--product-card-color);
  border-radius: 5px;
  margin: 10px;
  height: 60px;
}
</style>
