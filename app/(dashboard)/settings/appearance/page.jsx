'use client'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const AppearancePage = () => {
  return (
    <div>
      <p className='font-medium text-lg'>Appearance</p>
      <span className='text-xs'>
        Customize the appearance of the app. Automatically switch between day
        and night themes
      </span>
      <Separator />
      <p className='font-medium text-md my-4'>Fonts</p>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select a fruit' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='banana'>Banana</SelectItem>
            <SelectItem value='blueberry'>Blueberry</SelectItem>
            <SelectItem value='grapes'>Grapes</SelectItem>
            <SelectItem value='pineapple'>Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className='text-md font-medium my-4'>Theme</p>
      <span className='text-xs font-medium'>
        Select theme for your dashboard
      </span>
      <div className='flex justify-start'>
        <div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent'>
          <div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
            <div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
              <div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
              <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
            </div>
            <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
              <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
              <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
            </div>
            <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
              <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
              <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
            </div>
          </div>
          <span className='block w-full p-2 text-center font-normal'>
            Light
          </span>
        </div>

        <div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
          <div className='space-y-2 rounded-sm bg-slate-950 p-2'>
            <div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-sm'>
              <div className='h-2 w-[80px] rounded-lg bg-slate-400' />
              <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
            </div>
            <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
              <div className='h-4 w-4 rounded-full bg-slate-400' />
              <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
            </div>
            <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
              <div className='h-4 w-4 rounded-full bg-slate-400' />
              <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
            </div>
          </div>
          <span className='block w-full p-2 text-center font-normal'>Dark</span>
        </div>
      </div>
    </div>
  )
}

export default AppearancePage
