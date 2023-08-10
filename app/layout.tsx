import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import ModalProvider from '@/providers/modalProvider'
import { ToastProvider } from '@/providers/toastProvider'
import { ThemeProvider } from '@/providers/themeProvider'
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
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ToastProvider />
          <ModalProvider/>
          {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}
