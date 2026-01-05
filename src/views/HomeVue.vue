<template>
  <div class="home-container" @click.self="closeSideBar">
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
        <div
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
            <!--            <div class="produced">-->
            <!--              <span>{{productTypes}}</span>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </section>

    <aside class="right-aside" v-show="showSideBar">
      <div class="profile-container">
        <div class="icon-container">
          <span class="user-icon">
            <img src="@/assets/svg/profile.svg" alt="imagem do usuário" />
          </span>
        </div>
        <span class="name">Nome do Usuário</span>
      </div>

      <h2 class="aside-title">Opções</h2>
      <nav class="aside-nav">
        <button class="action-btn" @click="openPartnersModal">
          <span>Parceiros</span>
          <span class="partners-icon">
            <img src="@/assets/svg/partners.svg" alt="logo parceiros" />
          </span>
        </button>

        <button class="action-btn" @click="openProjectModal">
          <span>Projetos</span>
          <span class="partners-icon">
            <img src="@/assets/svg/project.svg" alt="logo projetos" />
          </span>
        </button>

        <button class="action-btn" @click="openProductTypeModal">
          <span>Produtos</span>
          <span class="partners-icon">
            <img src="@/assets/svg/products.svg" alt="logo produtos" />
          </span>
        </button>
      </nav>
    </aside>

    <PartnersFormModal
      v-if="showPartnersModal"
      @cancel="showPartnersModal = false"
      @success="showPartnersModal = false"
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
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PartnersFormModal from '@/components/PartnersFormModal.vue'
import { getProductType } from '@/services/productTypeService.js'
import ProjectFormModal from '@/components/ProjectFormModal.vue'
import ProductTypeFormModal from '@/components/ProductTypeFormModal.vue'
import router from '@/router/index.js'

const productTypes = ref([])
const showSideBar = ref(false)
const showPartnersModal = ref(false)
const showProjectModal = ref(false)
const showProductTypeModal = ref(false)

onMounted(async () => {
  await loadProductTypes()
})

function toggleSideBar() {
  showSideBar.value = !showSideBar.value
}

function closeSideBar() {
  showSideBar.value = false
}

function openPartnersModal() {
  showPartnersModal.value = true
}

function openProjectModal() {
  showProjectModal.value = true
}

function openProductTypeModal() {
  showProductTypeModal.value = true
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
}

.product-card:hover {
  background-color: #eeeeee;
  transition: all 0.3s;
}

.product-name {
  font-size: 1rem;
  margin: 0;
}

.right-aside {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #ffffffff;
  width: 250px;
  border-left: 1px solid var(--border-color);
  overflow-y: auto;
}

.profile-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
}

.icon-container {
  background-color: #eeeeee;
  border-radius: 50%;
  padding: 1rem;
}

.user-icon img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.name {
  text-align: center;
  padding: 0.5rem;
}

.aside-title {
  display: flex;
  justify-content: right;
  flex-direction: column;
  margin: 0 0 1.5rem 0;
}

.aside-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.action-btn {
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  background-color: #ffffffff;
  cursor: pointer;
  border: none;
  gap: 1rem;
}

.action-btn:hover {
  background-color: #e5e7eb;
}
</style>
