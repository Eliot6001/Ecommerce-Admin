import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import ModalProvider from '@/providers/modalProvider'
import { ToastProvider } from '@/providers/toastProvider'

import './globals.css'

export const metadata: Metadata = {
  title: 'ShoperHeaven!',
  description: 'Where Great things begin!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={``}>
          <ToastProvider />
          <ModalProvider/>
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}
