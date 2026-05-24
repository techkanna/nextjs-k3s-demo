import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Senthilkannan - Lead React/Next.js Developer',
  description: 'Experienced React and Next.js developer with 6+ years of expertise in building modern web applications',
  keywords: 'React, Next.js, JavaScript, TypeScript, Frontend Developer, Web Developer',
  authors: [{ name: 'Senthilkannan' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <Script defer src="https://analytics.techkanna.com/script.js" data-website-id="eccc14e6-dce6-454f-b421-c14682df8f0c"></Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
