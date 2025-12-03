import api from '@/services/api.js'

export async function getProduct() {
  try {
    const response = await api.get('/products')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao buscar produtos', error)
    return { success: false, error }
  }
}

export async function createProduct(clientData) {
  try {
    const response = await api.post('/products', clientData)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao cadastrar produtos', error)
    return { success: false, error }
  }
}
