'use client'

import { cn } from '@/lib/utils'
import React from 'react'

export const Card = ({ label, className, icon: Icon, total, description }) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-3 rounded-xl border p-5 shadow bg-white',
        className
      )}
    >
      <section className='flex justify-between gap-2'>
        <p className='text-sm'>{label}</p>
        <Icon size={10} />
      </section>
      <section className='flex flex-col gap-1'>
        <h2 className='text-2xl font-semibold'>{total}</h2>
        <p className='text-xs text-gray-500'>{description}</p>
      </section>
    </div>
  )
}
