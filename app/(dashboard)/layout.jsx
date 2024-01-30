import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout ({ children }) {
  return (
    <div className='min-h-screen w-full flex'>
      <Sidebar />
      <div className='p-8 w-full bg-slate-100'>{children}</div>
    </div>
  )
}
