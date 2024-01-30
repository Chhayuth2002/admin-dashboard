import { Button } from '@/components/ui/button'
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

export const DataTable = ({ data, meta, pagination }) => {
  const handleSelect = e => {
    pagination(meta.currentPage, e.target.value)
  }

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        {/* <Input
          placeholder='Filter name...'
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        /> */}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(item => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            ))}
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
                      onClick={() => pagination(page + 1, meta.perPage)}
                      variant={meta.currentPage === page ? 'default' : 'ghost'}
                    >
                      {page + 1}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
        <div className='space-x-2'>
          <select
            onChange={handleSelect}
            className='rounded-md bg-white focus:ring-black border border-slate-200 p-2 text-sm font-medium '
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
