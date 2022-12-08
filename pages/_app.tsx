import { AppProps } from "next/app"
import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.min.css'

import { SessionProvider } from "next-auth/react"
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false })

export default ({ Component, pageProps }: AppProps) => {
    return (
        <SessionProvider>
            <Head>
                <title>터치오더</title>
            </Head>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
