import type { Metadata } from 'next'
import { Inter, Noto_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoSerif = Noto_Serif({ subsets: ["latin"], variable: '--font-noto-serif' });

export const metadata: Metadata = {
  title: 'Novasphere Sol | AI-Powered Legal Intake',
  description: 'Stop wasting billable hours on unqualified leads. Our AI screens, qualifies, and prioritizes every inquiry so your team only speaks to clients that actually convert.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${notoSerif.variable} font-sans antialiased bg-background text-on-surface`}>
        {children}
      </body>
    </html>
  )
}
