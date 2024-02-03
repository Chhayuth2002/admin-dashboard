import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { RowAction } from '@/components/row-action'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import moment from 'moment'
import TablePagination from '@/components/pagination'
import { CourseFilter } from './course-filter'

export const CourseTable = ({ data, meta, filterParams, category }) => {
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
    categories: paramCat,
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
    const categoriesIds = categories.map(item => item.value)
    handleFilterChange('categories', categoriesIds)
    paramsQuery('categories', categoriesIds)
  }

  // filter name
  const filterName = e => {
    handleFilterChange('name', e.target.value)
    paramsQuery('name', e.target.value)
  }

  // filter date
  const onSelectDate = (field, date) => {
    const formatDate = moment(date).format('YYYY-MM-DD')
    if (date !== undefined) {
      handleFilterChange(field, formatDate)
      paramsQuery(field, formatDate)
    }
  }

  // params
  const paramsQuery = (name, value) => {
    const params = new URLSearchParams(searchParams)
    // add params
    if (Array.isArray(value)) {
      params.set(name, value.join(','))
    } else {
      params.set(name, value)
    }
    // remove params
    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(name, value)
    }

    router.push(pathname + '?' + params)

    // get params key and contruct a new query string with the key
    const queryString = Array.from(params.keys())
      .map(key => `${key}=${params.get(key)}`)
      .join('&')

    const newUrl = `${pathname}?${queryString}`

    router.push(newUrl, undefined, { scroll: false })
  }

  useEffect(() => {
    filterParams(meta?.currentPage || searchParams.get('page'), filters)
  }, [filters])

  return (
    <div className='w-full'>
      <CourseFilter
        filters={filters}
        onSelectDate={onSelectDate}
        filterName={filterName}
        filterCategories={filterCategories}
        category={category}
        setFilters={setFilters}
      />
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
      <TablePagination
        filter={filters}
        handlePagination={onChangePage}
        meta={meta}
      />
    </div>
  )
}
