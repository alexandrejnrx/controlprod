<template>
  <div class="container">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Cadastrar Produto</h2>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <label for="productType">Tipo de produto</label>
          <select id="productType" v-model="selectedProductTypeId">
            <option value="">Selecione o tipo</option>
            <option
              v-for="productType in productTypes"
              :key="productType.id"
              :value="productType.id"
            >
              {{ productType.name }}
            </option>
          </select>
        </div>

        <div class="input-field">
          <label for="nup">NUP</label>
          <input type="number" id="nup" v-model="nup" />
        </div>

        <div class="input-field">
          <label for="serialNumber">Serial</label>
          <input type="number" id="serialNumber" v-model="serialNumber" />
        </div>

        <div class="input-field">
          <label for="modem">Modem</label>
          <input type="text" id="modem" v-model="modem" />
        </div>

        <div class="input-field">
          <label for="imei">imei</label>
          <input type="text" id="imei" v-model="imei" />
        </div>

        <div class="input-field">
          <label for="firmwareVersion">Versão de firmware</label>
          <input type="text" id="firmwareVersion" v-model="firmwareVersion" />
        </div>

        <div class="input-field">
          <label for="productionDate">Data</label>
          <input type="date" id="productionDate" v-model="productionDate" />
        </div>

        <div class="input-field">
          <label for="batchNumber">Lote</label>
          <input type="number" id="batchNumber" v-model="batchNumber" />
        </div>

        <div class="input-field">
          <label for="producerName">Nome do responsável</label>
          <input type="text" id="producerName" v-model="producerName" />
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click="$emit('cancel')">Cancelar</button>
          <button type="submit" class="btn-submit">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProductType } from '@/services/productTypeService.js'
import { createProduct } from '@/services/productService.js'

const emit = defineEmits(['cancel', 'success'])

const selectedProductTypeId = ref('')
const productTypes = ref([])
const nup = ref('')
const serialNumber = ref('')
const modem = ref('')
const imei = ref('')
const firmwareVersion = ref('')
const productionDate = ref('')
const batchNumber = ref('')
const producerName = ref('')

onMounted(async () => {
  const result = await getProductType()
  if (result.success) {
    productTypes.value = result.data
  }
})

async function handleSubmit() {
  const selectedProductType = productTypes.value.find(
    (productType) => productType.id === Number(selectedProductTypeId.value),
  )

  const productData = {
    productType: selectedProductType,
    nup: nup.value,
    serialNumber: serialNumber.value,
    modem: modem.value,
    imei: imei.value,
    firmwareVersion: firmwareVersion.value,
    productionDate: productionDate.value,
    batchNumber: batchNumber.value,
    producerName: producerName.value,
  }

  const result = await createProduct(productData)

  if (result.success) {
    emit('success')
    emit('cancel')
  } else {
    console.error('Detalhes do erro:', result.error.response?.data)
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 5px;
}

.modal-header h2 {
  color: var(--bg-color);
  margin: 0;
}

.input-field {
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;
}

.input-field label {
  display: block;
  color: var(--bg-color);
  font-weight: bold;
  margin-bottom: 8px;
}

.input-field input,
.input-field select {
  width: 100%;
  padding: 10px;
  border: 1px solid #9e9c9c;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.btn-cancel,
.btn-submit {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
  margin-right: 10px;
}

.btn-cancel {
  background-color: var(--btn-secondary-color);
  color: white;
}

.btn-submit {
  background-color: var(--btn-primary-color);
  color: white;
}
</style>
