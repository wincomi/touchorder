import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"

export default (props) => {
    return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="매장 정보 변경" />
        <p className="text-muted">현재 기능 준비 중입니다 :)</p>
      </SellerLayout>
    )
}

export async function getStaticProps() {
  const store_id = 1 // TODO
  const res = await fetch(`http://localhost:3000/api/stores/${store_id}/tables/`)
  const items = await res.json()
  
  return {
    props: { items }
  }
}
