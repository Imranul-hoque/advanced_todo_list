import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { defaultSettings } from '@/script'
import { Toaster } from 'sonner';
import { QueryProvider } from '@/provider/query-provider'
import { ModalProvider } from '@/provider/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: defaultSettings.name,
    template : `%s | ${defaultSettings.name}`
  },
  description: defaultSettings.description,
  icons: [
    {
      url: '/logo-fav.svg',
      href : '/logo-fav.svg'
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("h-full w-full", inter.className)}>
          <QueryProvider>
            <ModalProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
