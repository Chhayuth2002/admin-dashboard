import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function InputLabel ({ label }) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='email'>{label}</Label>
      <Input type='email' id='email' placeholder='Email' />
    </div>
  )
}
