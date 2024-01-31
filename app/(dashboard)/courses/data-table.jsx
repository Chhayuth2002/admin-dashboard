import { DatePicker } from '@/components/date-picker'
import { RowAction } from '@/components/row-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Select from 'react-select'
import { useEffect, useState } from 'react'

export const DataTable = ({ data, meta, pagination, category }) => {
  const [filters, setFilters] = useState({
    selectedCategory: [],
    name: '',
    dateRange: {
      fromDate: null,
      toDate: null
    }
  })

  useEffect(() => {
    pagination(meta?.currentPage, filters)
  }, [filters])

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const filterCategories = selectedCategory => {
    handleFilterChange('selectedCategory', selectedCategory)
  }
  const filterName = e => {
    handleFilterChange('name', e.target.value)
  }

  const onSelectDate = (field, date) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: date
      }
    }))
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 p-2 border rounded-md w-full my-2 bg-white justify-between'>
        <div className='flex justify-between gap-2'>
          <Input onChange={filterName} placeholder='Filter name...' />
          <div className='flex gap-2'>
            <DatePicker
              placeholder='From date'
              onSelect={onSelectDate}
              field='fromDate'
            />
            <DatePicker
              placeholder='To date'
              onSelect={onSelectDate}
              field='toDate'
            />
          </div>
        </div>

        <div className='flex gap-2'>
          <Select
            className='w-full'
            isMulti
            closeMenuOnSelect={false}
            onChange={filterCategories}
            options={category.map(cat => ({ value: cat.id, label: cat.name }))}
          />
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
            {meta?.total > 0 ? (
              <>
                {data?.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className='font-medium'>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    {/* <TableCell>{item.summary}</TableCell> */}
                    <TableCell>
                      {new Date(item.created_at * 1000).toLocaleDateString()}
                    </TableCell>
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
              {meta?.pages.map(page => (
                <PaginationItem key={page}>
                  <Button
                    onClick={() => pagination(page + 1, filters)}
                    variant={meta.currentPage === page ? 'outline' : 'ghost'}
                  >
                    {page + 1}
                  </Button>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
