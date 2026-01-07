<template>
  <div class="home-container">
    <header class="header-container">
      <h1>ControlProd</h1>
      <div class="menu" @click="toggleSideBar">
        <button class="menu-toggle">
          <img src="@/assets/svg/menu.svg" alt="menu" />
        </button>
      </div>
    </header>

    <section class="content-container">
      <div class="section-header">
        <h2>Controle de Produção</h2>
        <div class="search-container">
          <input type="text" placeholder="Buscar..." />
          <button class="search-btn">
            <img src="@/assets/svg/search.svg" alt="buscar" />
          </button>
        </div>
      </div>

      <div class="products-list">
        <div v-if="productTypes.length === 0" class="empty-state">
          <div class="empty-icon">
            <img src="@/assets/svg/productsCard.svg" alt="sem produtos" />
          </div>
          <h3>Nenhum produto cadastrado</h3>
          <button class="btn-add-product" @click="handleMenuAction('openProductTypeModal')">
            Cadastrar Produto
          </button>
        </div>

        <div
          v-else
          class="product-card"
          v-for="productType in productTypes"
          :key="productType.id"
          @click="goToProcution(productType.id)"
        >
          <div class="product-icon">
            <img src="@/assets/svg/productsCard.svg" alt="icone produto" />
          </div>

          <div class="product-info">
            <div class="product-info-title">
              <span class="product-code">{{ productType.internalCode }}</span>
              <span class="project-name">{{ productType.project.name }}</span>
            </div>
            <h3 class="product-name">{{ productType.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <SidebarMenu
      :isVisible="showSideBar"
      :userName="userName"
      :menuItems="sidebarMenuItems"
      @menu-action="handleMenuAction"
      @close="closeSideBar"
    />

    <PartnersFormModal
      v-if="showPartnersModal"
      @cancel="showPartnersModal = false"
      @success="handlePartnersSuccess"
    />

    <ProjectFormModal
      v-if="showProjectModal"
      @cancel="showProjectModal = false"
      @success="handleProjectSuccess"
    />

    <ProductTypeFormModal
      v-if="showProductTypeModal"
      @cancel="showProductTypeModal = false"
      @success="handleProductTypeSuccess"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PartnersFormModal from '@/components/PartnersFormModal.vue'
import ProjectFormModal from '@/components/ProjectFormModal.vue'
import ProductTypeFormModal from '@/components/ProductTypeFormModal.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
import { getProductType } from '@/services/productTypeService.js'
import router from '@/router/index.js'
import partnersIcon from '@/assets/svg/partners.svg'
import projectIcon from '@/assets/svg/project.svg'
import productsIcon from '@/assets/svg/products.svg'
import { getCurrentUser } from '@/services/userService.js'

const userName = ref('Carregando...')
const productTypes = ref([])
const showSideBar = ref(false)
const showPartnersModal = ref(false)
const showProjectModal = ref(false)
const showProductTypeModal = ref(false)

const sidebarMenuItems = [
  {
    id: 'partners',
    label: 'Parceiros',
    icon: partnersIcon,
    action: 'openPartnersModal',
  },
  {
    id: 'projects',
    label: 'Projetos',
    icon: projectIcon,
    action: 'openProjectModal',
  },
  {
    id: 'products',
    label: 'Produtos',
    icon: productsIcon,
    action: 'openProductTypeModal',
  },
]

onMounted(async () => {
  const result = await getCurrentUser()
  if (result.success) {
    userName.value = result.data.name
  } else {
    userName.value = 'Usuário'
  }
})

onMounted(async () => {
  await loadProductTypes()
})

function toggleSideBar() {
  showSideBar.value = !showSideBar.value
}

function closeSideBar() {
  showSideBar.value = false
}

function handleMenuAction(action) {
  const actions = {
    openPartnersModal: () => {
      showPartnersModal.value = true
    },
    openProjectModal: () => {
      showProjectModal.value = true
    },
    openProductTypeModal: () => {
      showProductTypeModal.value = true
    },
  }

  if (actions[action]) {
    actions[action]()
  }
}

function goToProcution(productTypeId) {
  router.push({
    name: 'production',
    params: { productTypeId },
  })
}

async function loadProductTypes() {
  const response = await getProductType()
  if (response.success) {
    productTypes.value = response.data
  }
}

async function handlePartnersSuccess() {
  showPartnersModal.value = false
}

async function handleProjectSuccess() {
  showProjectModal.value = false
}

async function handleProductTypeSuccess() {
  showProductTypeModal.value = false
  await loadProductTypes()
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  background-color: #ffffffff;
  padding: 0 1rem;
}

.menu-toggle {
  border: none;
  background-color: #ffffffff;
  cursor: pointer;
  padding: 0;
}

.menu-toggle:active {
  background-color: #eeeeee;
  border-radius: 50%;
}

.content-container {
  display: flex;
  flex-direction: column;
  min-height: 250px;
  background-color: #ffffffff;
  margin: 1.5rem;
  border-radius: 5px;
  overflow-y: auto;
}

.section-header h2 {
  margin: 1rem 0 0 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  background-color: #f3f4f6;
  margin: 1rem 1rem 0 0;
}

.search-container input {
  min-width: 200px;
  height: 45px;
  border: none;
  padding: 0 1rem;
  outline: none;
}

.search-btn {
  height: 45px;
  background-color: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.products-list {
  padding: 1rem;
}

.product-card {
  display: flex;
  align-items: center;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 1rem;
  gap: 10px;
  margin: 10px;
  cursor: pointer;
}

.product-card:hover {
  background-color: #eeeeee;
  transition: all 0.3s;
}

.product-info-title {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.product-name {
  font-size: 1rem;
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem;
  text-align: center;
  min-height: 300px;
}

.empty-icon {
  opacity: 0.3;
  margin-bottom: 1.5rem;
}

.empty-icon img {
  width: 80px;
  height: 80px;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.btn-add-product {
  padding: 0.75rem 1.5rem;
  background-color: var(--btn-primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn-add-product:hover {
  opacity: 0.9;
}
</style>
