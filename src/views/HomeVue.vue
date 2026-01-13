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

    <section class="section-container">
      <div class="section-header">
        <h2>Produtos</h2>
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
          @click="goToProcution(productType.id, productType.name)"
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

function goToProcution(productTypeId, productTypeName) {
  router.push({
    name: 'production',
    params: {
      productTypeId,
      productTypeName,
    },
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
  background-color: #e5e7eb;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  padding: 0 1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--primary-color);
}

.menu-toggle {
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 5px;
  border: none;
  padding: 0;
}

.menu-toggle:hover {
  background-color: #eeeeee;
}

.section-container {
  display: flex;
  flex-direction: column;
  min-height: 250px;
  background-color: #ffffffff;
  margin: 1.5rem;
  border-radius: 5px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
}

.section-header h2 {
  display: flex;
  align-items: center;
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  padding: 10px;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
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
  background-color: var(--bg-color);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.product-card {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 10px;
  gap: 10px;
  margin: 10px;
  cursor: pointer;
}

.product-card:hover {
  background-color: #eeeeee;
  transition: all 0.3s;
  border: 1px solid #000000ff;
}

.product-info-title {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 5px;
}

.product-code,
.project-name {
  border-radius: 5px;
  padding: 5px;
  border: 1px solid var(--border-color);
}

.product-name {
  font-size: var(--font-size-base);
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem;
  text-align: center;
}

.empty-icon {
  opacity: 0.2;
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
  opacity: 0.6;
}
</style>
