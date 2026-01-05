<template>
  <div class="container">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Cadastrar Projeto</h2>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <label for="projectName">Nome do Projeto</label>
          <input type="text" id="projectName" v-model="projectName" />
        </div>

        <div class="input-field">
          <label for="clientId">Parceiro do Projeto</label>
          <select id="clientId" v-model="selectedClientId">
            <option value="">Selecione um cliente</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.name }}
            </option>
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
import { ref, onMounted } from 'vue'
import { getClients } from '@/services/clientService.js'
import { createProject } from '@/services/projectService.js'

const emit = defineEmits(['cancel', 'success'])

const selectedClientId = ref('')
const projectName = ref('')
const clients = ref([])
const active = ref(true)

onMounted(async () => {
  const result = await getClients()
  if (result.success) {
    clients.value = result.data
  }
})

async function handleSubmit() {
  const selectedClient = clients.value.find(
    (client) => client.id === Number(selectedClientId.value),
  )

  const projectData = {
    name: projectName.value,
    client: selectedClient,
    active: active.value,
  }

  const result = await createProject(projectData)

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
