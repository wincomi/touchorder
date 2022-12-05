import Image from 'next/image'
import { useQRCode } from 'next-qrcode'
import { useRouter } from 'next/router'
import getAbsoluteURL from '@utils/AbsoluteURL'

export default () => {
  const { Image } = useQRCode()
  const router = useRouter()
  const store_url = getAbsoluteURL() + `/stores/${router.query.store_id}`
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
    <Image text={store_url} options={qrcode_options} />
  )
}


