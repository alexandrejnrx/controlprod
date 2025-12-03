import api from '@/services/api.js'

export async function getProjects() {
  try {
    const response = await api.get('/projects')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao buscar projetos', error)
    return { success: false, error }
  }
}

export async function createProject(projectData) {
  try {
    const response = await api.post('/projects', projectData)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao cadastrar projeto', error)
    return { success: false, error }
  }
}
