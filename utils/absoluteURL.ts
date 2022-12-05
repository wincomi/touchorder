export default () => {
    if (process.env.VERCEL == '1') {
        return `https://` + process.env.NEXT_PUBLIC_VERCEL_URL
    } else {
        return `http://` + process.env.NEXT_PUBLIC_URL
    }
}
