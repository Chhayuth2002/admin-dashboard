import { api } from '@/config/axios'
import { defineCancelApiObject } from '@/lib/axios'

export const TagApi = {
  list: async function (cancel = false) {
    const response = await api.request({
      url: '/tags',
      method: 'GET',
      signal: cancel
        ? cancelApiObject[this.list.name].handleRequestCancellation().signal
        : undefined
    })
    return response.data
  }
}
const cancelApiObject = defineCancelApiObject(TagApi)
