import Navbar from './nav'

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
      <Navbar />
      <>{children}</>
    </>
  )
}