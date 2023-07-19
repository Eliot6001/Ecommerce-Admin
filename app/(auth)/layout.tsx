import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login!',
  description: 'Get ready for your journey!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center h-full">
    {children}
    </div>
    )

}
