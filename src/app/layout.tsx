import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Fraunces, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/shared/components/layout/Providers'
import './globals.css'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | APL Semilleros',
    default: 'APL Semilleros — Portal de Capacitación INDRA',
  },
  description: 'Portal educativo del programa de semilleros front-end de INDRA Colombia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`h-full antialiased ${jakartaSans.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <Providers>{children}</Providers>
        </body>
    </html>
  )
}
