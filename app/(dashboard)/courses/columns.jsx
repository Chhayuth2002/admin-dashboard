'use client'

import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

export const columns = [
  columnHelper.accessor('id', {
    header: 'No. ',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('summary', {
    header: 'Summary',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('created_at', {
    header: 'Created at',
    cell: info => {
      const createdAtValue = info.getValue()
      const formattedDate = new Date(createdAtValue * 1000).toLocaleString()
      return formattedDate
    }
  })
]
