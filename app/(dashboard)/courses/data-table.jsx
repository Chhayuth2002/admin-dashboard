import { MultiSelect } from '@/components/multi-select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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
import { useState } from 'react'

export const DataTable = ({ data, meta, pagination, category }) => {
  const [filter, setFilter] = useState([])

  const handleSelect = e => {
    pagination(meta.currentPage, e.target.value, filter)
  }

  const filterCategories = selectedCategory => {
    setFilter(selectedCategory)
    pagination(meta.currentPage, meta.perPage, selectedCategory)
  }

  return (
    <div className='w-full'>
      <div className='flex items-center p-2 border rounded-md w-full my-2 bg-white'>
        {/* <Input
          placeholder='Filter name...'
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        /> */}
        <div className='w-full'>
          <Label className=''>Filter categories</Label>
          <MultiSelect onChange={filterCategories} data={category} />
        </div>
      </div>
      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>No.</TableHead>
              <TableHead>Name</TableHead>
              {/* <TableHead>Summary</TableHead> */}
              <TableHead>Created at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(item => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                {/* <TableCell>{item.summary}</TableCell> */}
                <TableCell>
                  {new Date(item.created_at * 1000).toLocaleDateString()}
                </TableCell>
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
                  <Button
                    onClick={() => pagination(page + 1, meta.perPage, filter)}
                    variant={meta.currentPage === page ? 'outline' : 'ghost'}
                  >
                    {page + 1}
                  </Button>
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
        {/* <div className='space-x-2'>
          <Pagination>
            <PaginationContent>
              {meta?.pages?.map((page, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href='#'>{page + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </div>
    </div>
  )
}
