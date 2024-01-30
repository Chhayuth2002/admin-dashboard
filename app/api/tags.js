import { api } from '@/utils/axios'

export const tagsList = async () => {
  const response = await api.get('/tags')

  return response.data
}
