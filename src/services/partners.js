import api from '@/services/api.js'

export async function getPartners() {
  try {
    const response = await api.get('/clients')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao buscar parceiros', error)
    return { success: false, error }
  }
}

export async function createPartners(clientData) {
  try {
    const response = await api.post('/clients', clientData)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao cadastrar parceiro', error)
    return { success: false, error }
  }
}
