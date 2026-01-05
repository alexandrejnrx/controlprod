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
      <table class="production-table">
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
        <button class="action-btn" @click="openProductModal">
          <span>Cadastrar Equipamentos</span>
          <span class="partners-icon">
            <img src="@/assets/svg/products.svg" alt="logo produtos" />
          </span>
        </button>
      </nav>
    </aside>

    <ProductFormModal
      v-if="showProductModal"
      @cancel="showProductModal = false"
      @success="showProductModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getProduct } from '@/services/productService.js'
import ProductFormModal from '@/components/ProductFormModal.vue'
import { useRoute } from 'vue-router'
import api from '@/services/api.js'

const route = useRoute()
const products = ref([])
const showSideBar = ref(false)
const showProductModal = ref(false)

onMounted(async () => {
  await loadProducts()
})

function toggleSideBar() {
  showSideBar.value = !showSideBar.value
}

function closeSideBar() {
  showSideBar.value = false
}

function openProductModal() {
  showProductModal.value = true
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

.section-header h2 {
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

.content-container {
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.production-table {
  text-align: center;
  background-color: #ffffffff;
  border-radius: 20px;
  border-collapse: collapse;
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
</style>
