import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import React from 'react'

const UserFitler = ({ handleSearchChange, handleMenuSelect, name }) => {
  return (
    <div className='flex justify-between items-center py-4 bg-white p-2 my-2 rounded-md border gap-2 shadow-sm'>
      <Input
        name='name'
        placeholder='Filter name or email...'
        className='max-w-5xl'
        value={name || ''}
        onChange={e => handleSearchChange(e.target.value)}
      />

      <Select onValueChange={value => handleMenuSelect(value)}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter Users' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filter Users</SelectLabel>

            <SelectItem value='1'>Default</SelectItem>
            <SelectItem value='2'>With Deleted</SelectItem>
            <SelectItem value='3'>Only Deleted</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default UserFitler
