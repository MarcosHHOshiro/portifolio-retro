import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { FloatingTerminal } from '@/components/floating-terminal'

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono"
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: 'Fullstack Developer | Software Engineer',
  description: 'Portfolio of a Fullstack Developer specialized in frontend applications, APIs, system architecture, and databases.',
  generator: 'v0.app',
  icons: {
    icon: '/letra-m.svg',
    shortcut: '/letra-m.svg',
    apple: '/letra-m.svg',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5eddc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1115' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceMono.variable} ${spaceGrotesk.variable} font-mono antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <FloatingTerminal />
          <main>
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
