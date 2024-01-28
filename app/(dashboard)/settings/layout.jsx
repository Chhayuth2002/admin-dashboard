'use client'

import { Nav } from '@/components/nav'
import { Separator } from '@/components/ui/separator'
import { LayoutDashboard } from 'lucide-react'

const sidebarNavItems = [
  {
    variant: 'default',
    title: 'Profile',
    href: '/settings/profile'
  },
  {
    variant: 'ghost',
    title: 'Account',
    href: '/settings/account'
  },
  {
    variant: 'ghost',
    title: 'Appearance',
    href: '/settings/appearance'
  }
]

export default function SettingsLayout ({ children }) {
  return (
    <div className='hidden space-y-6 p-10 pb-16 md:block'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
        <p className='text-muted-foreground'>
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:w-1/5'>
          <Nav items={sidebarNavItems} />
        </aside>
        <div className='flex-1 lg:max-w-2xl'>{children}</div>
      </div>
    </div>
  )
}
