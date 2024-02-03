import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import Select from 'react-select'

export const CourseFilter = ({
  filters,
  onSelectDate,
  filterName,
  filterCategories,
  category,
  setFilters
}) => {
  return (
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
            onSelectDate={onSelectDate}
            date={filters?.from_date}
            field='from_date'
          />
          <DatePicker
            placeholder='To date'
            onSelectDate={onSelectDate}
            date={filters?.to_date}
            field='to_date'
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <Select
          className='w-full'
          isMulti
          value={category?.filter(item =>
            filters.categories?.includes(item.value)
          )}
          closeMenuOnSelect={false}
          onChange={filterCategories}
          options={category}
        />
        <Button
          onClick={() =>
            setFilters({
              categories: [],
              name: '',
              from_date: null,
              to_date: null
            })
          }
          variant='outline'
        >
          Clear filter
        </Button>
      </div>
    </div>
  )
}
