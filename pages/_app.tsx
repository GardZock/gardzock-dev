import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../components/layout'
import 'aos/dist/aos.css';
import {useEffect} from "react";
import AOS from 'aos';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, [])
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}