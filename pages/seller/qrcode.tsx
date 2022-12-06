import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useQRCode } from 'next-qrcode'
import { QRCodeOptions } from "next-qrcode/dist/useQRCode"
import getAbsoluteURL from '@utils/absoluteURL'

type Props = {
  store_id: number
}

export default ({ store_id }: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const store_id = 1

  return {
    props: { store_id }
  }
}
