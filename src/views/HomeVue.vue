<template>
  <div class="container">
    <header class="header-container">
      <h1>ControlProd</h1>
      <button class="profile-btn" @click="logout">Sair</button>
    </header>

    <main class="main-container">
      <div class="create-container">
        <div class="cards">
          Cliente
          <button class="create-btn" @click="openClientModal">Cadastrar</button>
        </div>

        <div class="cards">
          Projetos
          <button class="create-btn" @click="openProjectModal">Cadastrar</button>
        </div>

        <div class="cards">
          Tipo de produto
          <button class="create-btn" @click="openProductTypeModal">Cadastrar</button>
        </div>

        <div class="cards">
          Produto
          <button class="create-btn" @click="openProductModal">Cadastrar</button>
        </div>
      </div>

      <div class="products-container">
        <div class="product-header">
          <h3>Controle de Produção</h3>
        </div>
        <div class="product-card" v-for="product in products" :key="product.id">
          <div style="padding: 10px">
            <strong>{{ product.productType.name }}</strong
            ><br />
            NUP: {{ product.nup }}<br />
            Serial: {{ product.serialNumber }}<br />
          </div>
        </div>
      </div>
    </main>

    <ClientFormModal
      v-if="showClientModal"
      @cancel="showClientModal = false"
      @success="showClientModal = false"
    />

    <ProjectFormModal
      v-if="showProjectModal"
      @cancel="showProjectModal = false"
      @success="showProjectModal = false"
    />

    <ProductTypeFormModal
      v-if="showProductTypeModal"
      @cancel="showProductTypeModal = false"
      @success="showProductTypeModal = false"
    />

    <ProductFormModal
      v-if="showProductModal"
      @cancel="showProductModal = false"
      @success="handleProductSuccess"
    />
  </div>
</template>

<script setup>
import { logout } from '@/services/homeService.js'
import { ref, onMounted } from 'vue'
import ClientFormModal from '@/components/ClientFormModal.vue'
import ProjectFormModal from '@/components/ProjectFormModal.vue'
import ProductTypeFormModal from '@/components/ProductTypeFormModal.vue'
import ProductFormModal from '@/components/ProductFormModal.vue'
import { getProduct } from '@/services/productService.js'

const showClientModal = ref(false)
const showProjectModal = ref(false)
const showProductTypeModal = ref(false)
const showProductModal = ref(false)
const products = ref([])

async function loadProducts() {
  const response = await getProduct()
  if (response.success) {
    products.value = response.data
  }
}

onMounted(async () => {
  await loadProducts()
})

async function handleProductSuccess() {
  showProductModal.value = false
  await loadProducts()
}

function openClientModal() {
  showClientModal.value = true
}

function openProjectModal() {
  showProjectModal.value = true
}

function openProductTypeModal() {
  showProductTypeModal.value = true
}

function openProductModal() {
  showProductModal.value = true
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
  background-color: var(--secondary-color);
  border: none;
  cursor: pointer;
  color: var(--bg-color);
  font-weight: bold;
  height: 40px;
  width: 80px;
  padding: 0;
  border-radius: 5px;
}

.profile-btn:hover {
  background-color: #f2e9ff;
}

.main-container {
  margin-top: 10vh;
  background-color: var(--bg-color);
  padding: 50px 100px 0 100px;
}

.create-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cards {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary-color);
  border-radius: 5px;
  margin: 0 0 10px 0;
  padding: 0 10px;
  height: 50px;
  width: 70%;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 12px 40px rgba(0, 0, 0, 0.1);
}

.create-btn {
  background-color: var(--btn-primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  height: 35px;
  font-weight: bold;
}

.create-btn:hover {
  opacity: 0.8;
}

.products-container {
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);
  border-radius: 15px;
  min-height: 400px;
  margin-top: 50px;
}

.product-header {
  display: flex;
  justify-content: start;
}

.product-header h3 {
  padding: 0 30px;
}

.product-card {
  background-color: var(--product-card-color);
  border-radius: 5px;
  margin: 0 50px 10px 50px;
  height: 60px;
}
</style>
