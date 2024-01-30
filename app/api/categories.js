import { api } from '@/utils/axios'

export const categoriesList = async () => {
  const response = await api.get('/categories')
  return response.data
}
