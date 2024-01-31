import { api } from '@/utils/axios'


export const userList = async (token, page,filter) => {
  const response = await api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page, 
      name:filter
    }
  })
  return response.data
}

export const userShow = async id => {
  const response = await api.get(`/users/${id}`)
  return response.data
}
