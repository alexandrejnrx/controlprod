<template>
  <div class="container">
    <header class="header-container">
      <h1>ControlProd</h1>
      <div class="profile-menu">
        <div class="profile-toggle" @click="toggleProfileMenu">Perfil</div>
        <ul v-show="showProfileMenu" class="dropdown">
          <li><a>Meu Perfil</a></li>
          <li><a class="profile-btn" @click="logout">Sair</a></li>
        </ul>
      </div>
    </header>

    <div class="content-container">
      <main class="main-content">
        <section>
          <div class="section-header">
            <h2 class="section-title">Controle de Produção</h2>
            <div class="search-container">
              <input type="text" placeholder="Buscar..." />
              <button class="search-btn">
                <img src="@/assets/svg/search.svg" alt="buscar" />
              </button>
            </div>
          </div>

          <div class="products-list">
            <div
              class="product-card"
              v-for="product in products"
              :key="product.id"
              @click="goToProductsDetails(product.productType.id)"
            >
              <div class="product-icon">
                <img src="@/assets/svg/products.svg" alt="icone produto" />
              </div>

              <div class="product-info">
                <div class="product-info-title">
                  <span class="product-code">{{ product.productType.internalCode }}</span>
                  <span class="project-name">{{ product.productType.project.name }}</span>
                </div>
                <h3 class="product-name">{{ product.productType.name }}</h3>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <h2 class="sidebar-title">Ações Rápidas</h2>
        <nav class="quick-actions" aria-label="Ações de cadastro">
          <button class="action-btn" @click="openClientModal">
            <span>Clientes</span>
          </button>

          <button class="action-btn" @click="openProjectModal">
            <span>Projetos</span>
          </button>

          <button class="action-btn" @click="openProductTypeModal">
            <span>Tipos de produto</span>
          </button>

          <button class="action-btn" @click="openProductModal">
            <span>Produtos</span>
          </button>
        </nav>
      </aside>
    </div>

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
import { onMounted, ref } from 'vue'
import ClientFormModal from '@/components/ClientFormModal.vue'
import ProjectFormModal from '@/components/ProjectFormModal.vue'
import ProductTypeFormModal from '@/components/ProductTypeFormModal.vue'
import ProductFormModal from '@/components/ProductFormModal.vue'
import { getProduct } from '@/services/productService.js'
import { useRouter } from 'vue-router'

const showClientModal = ref(false)
const showProjectModal = ref(false)
const showProductTypeModal = ref(false)
const showProductModal = ref(false)
const products = ref([])
const showProfileMenu = ref(false)
const router = useRouter()

function goToProductsDetails(productTypeId) {
  router.push({
    name: 'products-details',
    params: { productTypeId },
  })
}

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
}

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
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-container {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--secondary-color);
  padding: 0 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: var(--bg-color);
  margin: 0;
}

.product-name {
  font-size: 1rem;
  margin: 0;
}

.profile-menu {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.profile-toggle {
  display: flex;
  align-items: center;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 12px 40px rgba(0, 0, 0, 0.1);
  min-width: 150px;
}

.dropdown li {
  margin: 0;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.dropdown li:hover {
  background-color: var(--card-bg-color);
}

.dropdown a,
.dropdown button {
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: block;
}

.content-container {
  display: flex;
  flex: 1;
  gap: 1.5rem;
  padding: 2rem;
  overflow: hidden;
}

.main-content {
  height: 100%;
  flex: 1;
  background-color: var(--secondary-color);
  border-radius: 20px;
  padding: 2rem;
  overflow-y: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.section-header h2 {
  margin: 0;
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  background-color: #f3f4f6;
}

.search-container input {
  flex: 1;
  min-width: 200px;
  height: 45px;
  border: none;
  padding: 0 1rem;
  background-color: #f3f4f6;
  outline: none;
  font-size: 0.9375rem;
}

.search-btn {
  height: 45px;
  background-color: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.search-btn img {
  height: 25px;
  width: 25px;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-card {
  display: flex;
  align-items: center;
  background-color: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.product-card:hover {
  background-color: var(--card-bg-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.product-icon img {
  background-color: var(--bg-color);
  height: 20px;
  padding: 12px;
  border-radius: 8px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.product-info-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.product-code {
  font-size: 0.9375rem;
  color: #9ca3af;
  font-weight: 500;
}

.project-name {
  display: inline-block;
  padding: 0.2rem 0.8rem;
  background-color: #9ca3af;
  color: white;
  border-radius: 12px;
}

.sidebar {
  height: 100%;
  width: 240px;
  background-color: var(--secondary-color);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 12px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-title {
  font-size: 1.2rem;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--secondary-color);
  border: 1px solid var(--card-bg-color);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.action-btn span {
  font-size: 1rem;
}

.action-btn:hover {
  background-color: #e5e7eb;
  transform: translateX(-2px);
}

@media (max-width: 1024px) {
  .content-container {
    flex-direction: column;
  }

  .quick-actions {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    width: 100%;
  }

  .quick-actions {
    flex-direction: column;
  }
}
</style>
