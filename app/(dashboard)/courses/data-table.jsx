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
import { DatePicker } from '@/components/date-picker'
import { RowAction } from '@/components/row-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { isString } from 'formik'

export const DataTable = ({ data, meta, filterParams, category }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // get initial params key value
  const paramCat = searchParams
    ?.get('categories')
    ?.split(',')
    .map(item => Number(item))
  const paramName = searchParams.get('name')
  const paramFrom = searchParams.get('from_date')
  const paramTo = searchParams.get('to_date')

  const [filters, setFilters] = useState({
    categories: [],
    name: paramName || '',
    from_date: paramFrom || null,
    to_date: paramTo || null
  })

  // change page
  const onChangePage = page => {
    filterParams(page, filters)
    paramsQuery('page', page)
  }

  // filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  // filter categories
  const filterCategories = categories => {
    handleFilterChange('categories', categories)
    paramsQuery('categories', categories)
  }

  // filter name
  const filterName = e => {
    handleFilterChange('name', e.target.value)
    paramsQuery('name', e.target.value)
  }

  // filter date
  const onSelectDate = (field, date) => {
    handleFilterChange(field, date)

    if (date !== undefined) {
      paramsQuery(field, date)
    }
  }

  // params
  const paramsQuery = (name, value) => {
    const params = new URLSearchParams(searchParams)

    // add params
    if (Array.isArray(value)) {
      const stringValue = value.map(v => v.value).join(',')
      params.set(name, stringValue)
    } else {
      params.set(name, value)
    }

    // remove params
    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(name, value)
    }

    // get params key and contruct a new query string
    const queryString = Array.from(params.keys())
      .map(key => `${key}=${params.get(key)}`)
      .join('&')

    const newUrl = `${pathname}?${queryString}`

    router.push(newUrl, undefined, { shallow: true })
  }

  // filter the initial params
  useEffect(() => {
    const initialFilters = {
      categories:
        paramCat !== null
          ? category.filter(item => paramCat.includes(item.value))
          : []
    }

    setFilters(prev => ({ ...prev, initialFilters }))
    filterParams(meta?.currentPage || searchParams.get('page'), initialFilters)
  }, [])

  useEffect(() => {
    filterParams(meta?.currentPage || searchParams.get('page'), filters)
  }, [filters])

  console.log(filters)

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 p-2 border rounded-md w-full my-2 bg-white justify-between'>
        <div className='flex justify-between gap-2'>
          <Input
            value={filters.name ? filters.name : ''}
            onChange={filterName}
            placeholder='Filter name...'
          />
          <div className='flex gap-2'>
            <DatePicker
              placeholder='From date'
              onSelect={onSelectDate}
              field='from_date'
            />
            <DatePicker
              placeholder='To date'
              onSelect={onSelectDate}
              field='to_date'
            />
          </div>
        </div>

        <div className='flex gap-2'>
          <Select
            className='w-full'
            isMulti
            value={category.filter(item => paramCat?.includes(item.value))}
            closeMenuOnSelect={false}
            onChange={filterCategories}
            options={category}
          />
        </div>
      </div>
      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>No.</TableHead>
              <TableHead>Name</TableHead>
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
                    onClick={() => onChangePage(page + 1)}
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
