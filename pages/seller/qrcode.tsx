import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { InferGetStaticPropsType } from "next"
import { useQRCode } from 'next-qrcode'
import { QRCodeOptions } from "next-qrcode/dist/useQRCode"
import getAbsoluteURL from '@utils/absoluteURL'
import { getSession, GetSessionParams } from "next-auth/react"
import { useRouter } from "next/router" //삭제 예정

type Props = {
  store_id: number
}

export default ({ store_id }: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const router = useRouter() //삭제 예정
  if(store_id == null) { router.replace(router.asPath) } //삭제 예정

  const { Image } = useQRCode()
  const store_url = `${getAbsoluteURL()}/stores/${store_id}`
  const qrcode_options: QRCodeOptions = {
    level: '',
    margin: 3,
    scale: 5,
    width: 200,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    }
  }

  return (
    <SellerLayout>
      <HeaderTitle title="매장 관리" subtitle="QR 코드 생성" />
      <div className="text-center text-muted">
        <p><Image text={store_url} options={qrcode_options} /></p>
        <p className="text-muted">{store_url}</p>
      </div>
    </SellerLayout>
  )
}

export async function getServerSideProps( context: GetSessionParams ) {
  const session = await getSession(context)
  if (session?.user == null) {
    return {
      props: { items: null }
    }
  }

  const store_id = session?.user.store_id

  return {
    props: { store_id }
  }
}
