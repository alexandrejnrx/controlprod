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
      <div v-if="products.length === 0" class="empty-state">
        <div class="empty-icon">
          <img src="@/assets/svg/products.svg" alt="sem equipamentos" />
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
    </section>

    <SidebarMenu
      :isVisible="showSideBar"
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

const route = useRoute()
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
]

onMounted(async () => {
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
  }

  if (actions[action]) {
    actions[action]()
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
  justify-content: center;
  min-height: 400px;
  margin: 1.5rem;
  border-radius: 5px;
}

.production-table {
  text-align: center;
  background-color: #ffffffff;
  border-radius: 20px;
  border-collapse: collapse;
  height: 100px;
  margin-top: 1rem;
}

.production-table thead {
  background-color: #d0d0d0;
  color: #ffffffff;
}

.production-table th {
  padding: 0.5rem;
}

.production-table td {
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
  min-height: 400px;
  background-color: #ffffff;
  border-radius: 20px;
  width: 100%;
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
