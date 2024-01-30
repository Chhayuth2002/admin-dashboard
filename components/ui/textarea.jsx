import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(
  ({ className, field, form: { touched, errors }, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...field}
          ref={ref}
          {...props}
        />
        {touched[field.name] && errors[field.name] && (
          <div className='error mt-2 text-sm text-rose-500 italic'>
            {errors[field.name]}
          </div>
        )}
      </>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
