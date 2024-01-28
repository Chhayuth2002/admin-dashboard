import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '../lib/utils'
import { Sidebar } from '../components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Course development',
  description: 'Manage course easily with Course Development'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={cn('min-h-screen w-full  flex', inter.className)}>
        <Sidebar />
        <div className='p-8 w-full'>{children}</div>
      </body>
    </html>
  )
}
