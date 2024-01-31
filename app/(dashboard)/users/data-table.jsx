import { userList } from '@/app/api/users'
import { DatePicker } from '@/components/date-picker'
import { RowAction } from '@/components/row-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect, useState } from 'react'

export const DataTable = ({ data, meta, pagination }) => {
  const [filter, setFilter] = useState('')

  useEffect(() => {
    pagination(meta?.currentPage, filter)
  }, [filter])

  console.log(filter)

  return (
    <div className='w-full'>
      <div className='flex items-center py-4 bg-white p-2 my-2 rounded-md border '>
        <Input
          placeholder='Filter name or email...'
          className='max-w-sm'
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meta?.total > 0 ? (
              <>
                {data?.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className='font-medium'>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <RowAction />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          total of {meta?.total} results
        </div>
        <div className='space-x-2'>
          <Pagination>
            <PaginationContent>
              {meta?.pages?.map(page => (
                <PaginationItem key={page}>
                  <PaginationLink href='#'>
                    <Button
                      onClick={() => pagination(page + 1, filter)}
                      variant={meta.currentPage === page ? 'outline' : 'ghost'}
                    >
                      {page + 1}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
