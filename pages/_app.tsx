import type { AppProps } from "next/app"
import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.min.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useState } from "react"
import { setDefaultResultOrder } from "dns"

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false })

interface CustomPageProps {
    // your props
}

function MyApp ({ Component, pageProps }: AppProps<CustomPageProps>) {
    const [user, setUser] = useState({})
    //useState 선언,
    //fetch나 axios로 디비 내용 가져옴 useState에 값 담기
    const getUser=({userData})=>{
        setUser(JSON.parse(userData))
    }
    
    return (
        <>
            <Head>
                <title>터치오더</title>
            </Head>
            <Component {...pageProps} getUser={getUser}/>
        </>
    )
}
export default MyApp;