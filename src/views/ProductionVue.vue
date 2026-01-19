<template>
  <div class="production-container">
    <header class="header-container">
      <button class="btn-back" @click="router.push({ name: 'home' })">
        <img src="@/assets/svg/back.svg" alt="voltar" />
      </button>
      <h1>ControlProd</h1>
      <div class="menu" @click="toggleSideBar">
        <button class="menu-toggle">
          <img src="@/assets/svg/menu.svg" alt="menu" />
        </button>
      </div>
    </header>

    <section class="content-container">
      <div class="section-header">
        <h2>{{ productTypeName }}</h2>
        <div class="search-container">
          <input type="text" placeholder="Buscar..." />
          <button class="search-btn">
            <img src="@/assets/svg/search.svg" alt="buscar" />
          </button>
        </div>
      </div>

      <div class="products-list">
        <div v-if="products.length === 0" class="empty-state">
          <div class="empty-icon">
            <img src="@/assets/svg/productsCard.svg" alt="sem equipamentos" />
          </div>
          <h3>Nenhum equipamento cadastrado</h3>
          <button class="btn-add-product" @click="handleMenuAction('openProductModal')">
            Cadastrar Equipamento
          </button>
        </div>

        <table v-else class="production-table">
          <thead>
            <tr>
              <th class="border-left">NUP</th>
              <th>SERIAL</th>
              <th>MODEM</th>
              <th>IMEI</th>
              <th>VERSÃO DE FIRMWARE</th>
              <th>DATA DA PRODUÇÃO</th>
              <th>LOTE</th>
              <th class="border-right">RESPONSÁVEL</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <input
                  v-model="product.nup"
                  @blur="updateField(product.id, 'nup', product.nup)"
                  class="editable-cell"
                />
              </td>

              <td>
                <input
                  v-model="product.serialNumber"
                  @blur="updateField(product.id, 'serialNumber', product.serialNumber)"
                  class="editable-cell"
                />
              </td>

              <td>
                <input
                  v-model="product.modem"
                  @blur="updateField(product.id, 'modem', product.modem)"
                  class="editable-cell"
                />
              </td>

              <td>
                <input
                  v-model="product.imei"
                  @blur="updateField(product.id, 'imei', product.imei)"
                  class="editable-cell"
                />
              </td>

              <td>
                <input
                  v-model="product.firmwareVersion"
                  @blur="updateField(product.id, 'firmwareVersion', product.firmwareVersion)"
                  class="editable-cell"
                />
              </td>

              <td>
                <input
                  v-model="product.productionDate"
                  @blur="updateField(product.id, 'productionDate', product.productionDate)"
                  type="date"
                  class="editable-cell"
                />
              </td>

              <td>
                <input
                  v-model="product.batchNumber"
                  @blur="updateField(product.id, 'batchNumber', product.batchNumber)"
                  class="editable-cell"
                />
              </td>

              <td>
                <input
                  v-model="product.producerName"
                  @blur="updateField(product.id, 'producerName', product.producerName)"
                  class="editable-cell"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <SidebarMenu
      :isVisible="showSideBar"
      :userName="userName"
      :menuItems="sidebarMenuItems"
      @menu-action="handleMenuAction"
      @close="closeSideBar"
    />

    <ProductFormModal
      v-if="showProductModal"
      @cancel="showProductModal = false"
      @success="handleProductSuccess"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '@/services/productService.js'
import ProductFormModal from '@/components/ProductFormModal.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
import api from '@/services/api.js'
import productsIcon from '@/assets/svg/products.svg'
import { getCurrentUser } from '@/services/userService.js'
import router from '@/router/index.js'
import logoutIcon from '@/assets/svg/logout.svg'
import { logout } from '@/services/homeService.js'

const route = useRoute()
const userName = ref('Carregando...')
const productTypeName = ref('Carregando...')
const products = ref([])
const showSideBar = ref(false)
const showProductModal = ref(false)

const sidebarMenuItems = [
  {
    id: 'register-equipment',
    label: 'Cadastrar Equipamentos',
    icon: productsIcon,
    action: 'openProductModal',
  },
  {
    id: 'logout',
    label: 'Sair',
    icon: logoutIcon,
    action: 'logout',
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
  await loadProductTypeName()
  await loadProducts()
})

function toggleSideBar() {
  showSideBar.value = !showSideBar.value
}

function closeSideBar() {
  showSideBar.value = false
}

function handleMenuAction(action) {
  const actions = {
    openProductModal: () => {
      showProductModal.value = true
    },
    logout: () => {
      logout()
    },
  }

  if (actions[action]) {
    actions[action]()
  }
}

async function loadProductTypeName() {
  try {
    const productTypeId = route.params.productTypeId
    const response = await api.get('/product-types')
    const productType = response.data.find((pt) => pt.id === parseInt(productTypeId))

    if (productType) {
      productTypeName.value = productType.name
    } else {
      productTypeName.value = 'Controle de Produção'
    }
  } catch (error) {
    console.error('Erro ao carregar o tipo de produto:', error)
    productTypeName.value = 'Controle de Produção'
  }
}

async function loadProducts() {
  const productTypeId = route.params.productTypeId

  const response = await getProduct()
  if (response.success) {
    products.value = response.data.filter(
      (product) => product.productType.id === parseInt(productTypeId),
    )
  }
}

async function handleProductSuccess() {
  showProductModal.value = false
  await loadProducts()
}

async function updateField(productId, fieldName, value) {
  try {
    const endpoints = {
      nup: { url: `/products/${productId}/update-nup`, data: { newNup: value } },
      serialNumber: {
        url: `/products/${productId}/update-serial-number`,
        data: { newSerialNumber: value },
      },
      modem: { url: `/products/${productId}/update-modem`, data: { newModem: value } },
      imei: { url: `/products/${productId}/update-imei`, data: { newImei: value } },
      firmwareVersion: {
        url: `/products/${productId}/update-firmware-version`,
        data: { newFirmwareVersion: value },
      },
      productionDate: {
        url: `/products/${productId}/update-production-date`,
        data: { newProductionDate: value },
      },
      batchNumber: {
        url: `/products/${productId}/update-batch-number`,
        data: { batchNumber: value },
      },
      producerName: {
        url: `/products/${productId}/update-producer-name`,
        data: { newProducerName: value },
      },
    }

    const endpoint = endpoints[fieldName]
    await api.patch(endpoint.url, endpoint.data)
  } catch (error) {
    console.error('Erro ao atualizar:', error)
  }
}
</script>

<style scoped>
.production-container {
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
  border-bottom: 1px solid #d0d0d0;
  background-color: var(--primary-color);
}

.btn-back {
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 5px;
  border: none;
  padding: 0;
}

.btn-back:hover {
  background-color: #e5e7eb;
}

.header-container h1 {
  margin: 0;
}

.menu-toggle {
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 5px;
  border: none;
  padding: 0;
}

.menu-toggle:hover {
  background-color: #e5e7eb;
}

.content-container {
  display: flex;
  flex-direction: column;
  min-height: 250px;
  background-color: #ffffffff;
  margin: 1.5rem;
  border-radius: 5px;
  overflow-y: auto;
  border: 1px solid #d0d0d0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d0d0d0;
  padding: 10px;
}

.section-header h2 {
  display: flex;
  align-items: center;
  margin: 0;
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
  background-color: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.products-list {
  margin: 10px;
}

.production-table {
  width: 100%;
  text-align: center;
  border-radius: 10px;
  border-collapse: collapse;
}

.production-table thead {
  background-color: #000000ff;
  color: #ffffffff;
}

.production-table th {
  padding: 0.5rem;
}

.production-table td {
  border-bottom: 1px solid #d0d0d0;
  padding: 0.5rem;
}

.production-table td {
  border-right: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  padding: 0.5rem;
}

.border-left {
  border-radius: 10px 0 0 0;
}

.border-right {
  border-radius: 0 10px 0 0;
}

.editable-cell {
  border: 1px solid transparent;
  text-align: center;
  width: 100%;
}

.editable-cell:focus {
  outline: none;
  border-color: var(--border-color);
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
