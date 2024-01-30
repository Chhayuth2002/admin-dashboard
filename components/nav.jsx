'use client'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Nav = ({ items, isCollapsed }) => {
  const pathName = usePathname()

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className='group flex flex-col gap-4 py-2 justify-between h-4/5'
      >
        <nav className='grid gap-1 px-2  '>
          {items.map((item, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    passHref={true}
                    href={item.href}
                    className={cn(
                      'h-9 w-9',
                      buttonVariants({
                        variant: item.href === pathName ? 'default' : 'ghost',
                        size: 'icon'
                      }),
                      item.variant === 'default' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                    )}
                  >
                    {item.icon && <item.icon className='h-4 w-4' />}

                    <span className='sr-only'>{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side='right'
                  className='flex items-center gap-4'
                >
                  {item.title}
                  {item.label && (
                    <span className='ml-auto text-muted-foreground'>
                      {item.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  buttonVariants({
                    variant: item.href === pathName ? 'default' : 'ghost',
                    size: 'sm'
                  }),
                  item.variant === 'default' &&
                    'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                  'justify-start'
                )}
              >
                {item.icon && <item.icon className='mr-2 h-4 w-4' />}

                {item.title}
                {item.label && (
                  <span
                    className={cn(
                      'ml-auto',
                      item.variant === 'default' &&
                        'text-background dark:text-white'
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  )
}
