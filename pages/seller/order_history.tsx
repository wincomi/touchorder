import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"

export default () => {
    return (
      <SellerLayout>
        <HeaderTitle title="주문" subtitle="주문 알림" />
        <p className="text-muted">현재 기능 준비 중입니다 :)</p>
      </SellerLayout>
    )
}
