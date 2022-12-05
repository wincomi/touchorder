import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { useQRCode } from 'next-qrcode'
import { useRouter } from 'next/router'
import getAbsoluteURL from '@utils/absoluteURL'

export default ({ orders }) => {
    const { Image } = useQRCode()
    const router = useRouter()
    const store_url = `${getAbsoluteURL}/stores/${router.query.store_id}`
    const qrcode_options = {
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
                {/* <p>클릭하여 QR 코드 이미지를 다운로드할 수 있습니다.</p> */}
            </div>
        </SellerLayout>
    )
}

export async function getServerSideProps() {
  const store_id = 1

return {
   props: { store_id }
 }
}

