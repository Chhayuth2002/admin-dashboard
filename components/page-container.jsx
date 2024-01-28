import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { useRouter } from 'next/navigation'

export const PageContainer = ({
  className,
  title,
  description,
  children,
  href
}) => {
  const router = useRouter()

  return (
    <div className='hidden space-y-6 p-10 pb-16 md:block'>
      <div className='flex justify-between'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
          <p className='text-muted-foreground'>{description}</p>
        </div>
        {href && (
          <Button onClick={() => router.push(href)}>
            <Plus className='mr-2 h-4 w-4' />
            Add New
          </Button>
        )}
      </div>

      <Separator className='my-6' />
      {children}
    </div>
  )
}
