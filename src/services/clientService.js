import api from '@/services/api.js'

export async function getClients() {
  try {
    const response = await api.get('/clients')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao buscar clientes', error)
    return { success: false, error }
  }
}

export async function createClient(clientData) {
  try {
    const response = await api.post('/clients', clientData)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao cadastrar projeto', error)
    return { success: false, error }
  }
}
