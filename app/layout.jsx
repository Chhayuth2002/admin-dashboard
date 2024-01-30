import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/store/provider'
// import { useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Course development',
  description: 'Manage course easily with Cours e Development'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position='top-center' closeButton />
        </Providers>
      </body>
    </html>
  )
}
