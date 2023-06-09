import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: '700' })

export const metadata = {
  title: 'GardZock Developer',
  description: 'Portfolio of Miguel Otavio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
