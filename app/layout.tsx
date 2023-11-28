import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar'
import toast, { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StackVerse | Future',
  description: 'The way forward',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    
      <body className={inter.className}>
      <Navbar />
        {children}
          <Toaster />
        </body>
    </html>
  )
}
