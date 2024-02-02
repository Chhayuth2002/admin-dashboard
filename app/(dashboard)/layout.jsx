'use client'
import { AuthWrapper } from '@/components/auth-wrapper'
import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout ({ children }) {
  return (
    <AuthWrapper>
      <div className='min-h-screen w-full flex'>
        <Sidebar />
        <div className='p-8 w-full bg-slate-100'>{children}</div>
      </div>
    </AuthWrapper>
  )
}
