import { api } from '@/config/axios'
import { defineCancelApiObject } from '@/lib/axios'

export const CategoriesTag = {
  list: async function (cancel = false) {
    const response = await api.request({
      url: '/categories',
      method: 'GET',
      signal: cancel
        ? cancelApiObject[this.list.name].handleRequestCancellation().signal
        : undefined
    })
    return response.data
  }
}
const cancelApiObject = defineCancelApiObject(CategoriesTag)
