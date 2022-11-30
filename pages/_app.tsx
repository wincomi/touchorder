import { AppProps } from "next/app"
import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.min.css'

import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useState } from "react"

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false })

export default ({ Component, pageProps }: AppProps) => {
    const [testValue, setTestValue] = useState(0)
    const [user, setUser] = useState({})
    //useState 선언,
    //fetch나 axios로 디비 내용 가져옴 useState에 값 담기

    return (
        <>
            <Head>
                <title>터치오더</title>
            </Head>
            <Component {...pageProps} testValue={testValue} user={user} />
        </>
    )
}
