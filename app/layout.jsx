import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SozBoost — Marketplace Creator & Brand Indonesia',
  description:
    'Hubungkan brand/UMKM dengan content creator terbaik Indonesia. Platform marketplace untuk kolaborasi sosial media yang aman dan transparan.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
