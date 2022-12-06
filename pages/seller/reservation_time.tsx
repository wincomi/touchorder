import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table, Button } from 'react-bootstrap'
import getAbsoluteURL from '@utils/absoluteURL'

export default ({ items }) => {

}

export async function getServerSideProps() {
    const store_id = 1 // TODO
    const res = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/tables/`)
    const items = await res.json()
    
    return {
      props: { items }
    }
}
  