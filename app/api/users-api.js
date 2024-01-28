import { api } from '@/config/axios'
import { defineCancelApiObject } from '@/lib/axios'

export const UsersApi = {
  show: async function (id, cancel = false) {
    const response = await api.request({
      url: '/users/:id',
      method: 'GET',
      signal: cancel
        ? cancelApiObject[this.show.name].handleRequestCancellation().signal
        : undefined
    })
    return response.data
  },
  list: async function (cancel = false) {
    const response = await api.request({
      url: '/users',
      method: 'GET',
      signal: cancel
        ? cancelApiObject[this.list.name].handleRequestCancellation().signal
        : undefined
    })
    return response.data
  }
}
const cancelApiObject = defineCancelApiObject(UsersApi)
