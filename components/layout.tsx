import Footer from './footer';
import Navbar from './nav';
import Head from 'next/head';

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <>
      <Head>
        <title> | GardZock Developer</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="description" content="Portfolio of Miguel Otavio."/>
      </Head>
      <Navbar />
      <>{children}</>
      <Footer/>
    </>
  )
}