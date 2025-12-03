import api from '@/services/api.js'

export async function getProductType() {
  try {
    const response = await api.get('/product-types')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao buscar os tipos de produtos', error)
    return { success: false, error }
  }
}

export async function createProductType(productTypeData) {
  try {
    const response = await api.post('/product-types', productTypeData)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao cadastrar tipo do produto', error)
    return { success: false, error }
  }
}
