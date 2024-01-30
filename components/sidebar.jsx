'use client'

import {
  Book,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  UserRound
} from 'lucide-react'
import { Nav } from './nav'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 770) {
        setIsCollapsed(true)
      }

      if (window.innerWidth >= 1000) {
        setIsCollapsed(false)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  return (
    <div className='relative max-w-[200px] border-r px-2 pb-10 pt-20'>
      <div className='absolute right-[-20px] top-7'>
        <Button
          onClick={toggleSidebar}
          variant='secondary'
          className='rounded-full p-2'
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        items={[
          {
            title: 'Dashboard',
            icon: LayoutDashboard,
            variant: 'default',
            href: '/'
          },
          {
            title: 'Users',
            icon: UserRound,
            variant: 'ghost',
            href: '/users'
          },
          {
            title: 'Courses',
            icon: Book,
            variant: 'ghost',
            href: '/courses'
          },
          {
            title: 'Settings',
            icon: Settings,
            variant: 'ghost',
            href: '/settings'
          }
        ]}
      />
    </div>
  )
}
