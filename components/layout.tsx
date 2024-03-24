import Footer from '@/components/footer';
import Navbar from '@/components/nav';
import Head from 'next/head';
import Anim from '@/components/anim';

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title> | GardZock Developer</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="description" content="Portfolio of Miguel Otavio."/>
      </Head>
      <Navbar />
      <Anim />
      <>{children}</>
      <Footer/>
    </>
  )
}