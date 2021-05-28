import '../styles/globals.scss'
import RainbowBar from "../components/elements/RainbowLine/"
import Header from '../components/modules/Header/'
import Footer from '../components/modules/Footer'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <RainbowBar/>
      <div className={styles.container}>
      <Header/>
        <Component {...pageProps} />
        <Footer/>
      </div>
      
    </div>
  )
}

export default MyApp
