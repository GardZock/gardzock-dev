import Navbar from './nav'
import Head from 'next/head'

export const metadata = {
    title: 'GardZock Developer',
    description: 'Portfolio of Miguel Otavio.',
}

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <>
      <Head>
        <title> | GardZock Dev</title>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Navbar />
      <>{children}</>
    </>
  )
}