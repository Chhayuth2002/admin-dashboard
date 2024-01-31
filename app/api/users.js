import { api } from '@/utils/axios'

export const userList = async (token, page, name) => {
  const response = await api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page,
      name
    }
  })
  return response.data
}

export const userShow = async id => {
  const response = await api.get(`/users/${id}`)
  return response.data
}
