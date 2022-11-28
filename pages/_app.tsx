import { AppProps } from "next/app"
import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.min.css'

export default ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>터치오더</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
