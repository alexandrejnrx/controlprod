<template>
  <div class="container">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Cadastrar Parceiro</h2>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <label for="clientName">Nome</label>
          <input type="text" id="clientName" v-model="clientName" />
        </div>

        <div class="input-field">
          <label for="clientType">Tipo de Parceiro</label>
          <select id="clientType" v-model="clientType">
            <option value="">Selecione um tipo</option>
            <option value="INTERNAL">Interno</option>
            <option value="EXTERNAL">Externo</option>
          </select>
        </div>

        <div class="input-field">
          <label for="active">Status</label>
          <select id="active" v-model="active">
            <option value="">Selecione o status</option>
            <option :value="true">Ativo</option>
            <option :value="false">Inativo</option>
          </select>
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
import { ref } from 'vue'
import { createPartners } from '@/services/partners.js'

const emit = defineEmits(['cancel', 'success'])

const clientName = ref('')
const clientType = ref('')
const active = ref(true)

async function handleSubmit() {
  const clientData = {
    name: clientName.value,
    clientType: clientType.value,
    active: active.value,
  }

  const result = await createPartners(clientData)

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
  background-color: var(--primary-color);
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
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
  margin: 0;
}

.input-field {
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;
}

.input-field label {
  display: block;
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
  outline: none;
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
  background-color: #f16d6d;
  color: var(--text-color);
}

.btn-cancel:hover {
  opacity: 0.6;
}

.btn-submit {
  background-color: var(--btn-primary-color);
  color: white;
}

.btn-submit:hover {
  opacity: 0.6;
}
</style>
