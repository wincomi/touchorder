import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Button, Table } from 'react-bootstrap'
import { useRouter } from 'next/router'
import getAbsoluteURL from '@utils/absoluteURL'
import { InferGetServerSidePropsType } from 'next'

export default ({ orders }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  //주문 확인 버튼
  const checkOrder = async (e) => {
    var orderId = e.target.getAttribute('data-order-id')

    const result = await fetch(getAbsoluteURL() + `/api/orders/update_status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId, 
        status: 1,
      })
    })
   location.reload()
  }

   //주문 거절 버튼
  const rejectOrder = async (e) => {
    var orderId = e.target.getAttribute('data-order-id')

    const result = await fetch(getAbsoluteURL() + `/api/orders/update_status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId, 
        status: -1,
      })
    })
   location.reload()
  }

 //주문 상세 버튼
  const detailOrder = async (e) => {
    var orderId = e.target.getAttribute('data-order-id')

    router.push({
      pathname: '/seller/order_detailed',
      query: { order_id: orderId },
    })
  }

    return (
        <SellerLayout>
          <HeaderTitle title="주문" subtitle="주문 통합 조회" />
          <Table striped>
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>주문이 들어온 테이블</th>
                  <th>가격</th>
                  <th>주문날짜</th>
                  <th>주문상태</th>
                  <th>주문확인</th>
                  <th>주문거절</th>
                  <th>주문상세</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((item) => (
                  <tr>
                    <td>{item.order_id}</td>
                    <td>{item.table_id}</td>
                    <td>{new Intl.NumberFormat('ko-KR').format(item.payments)}원</td>
                    <td>{item.date}</td>
                    {/*0이면 대기중 1이면 주문확인 2이면 정산 나머지(-1)이면 주문취소*/}
                    <td>{(item.status == 0) ? "대기중":(item.status == 1) ? "주문 확인":(item.status == 2) ? "정산완료" : "주문 취소"}</td>
                    <td><Button data-order-id={item.order_id} variant="primary" size="sm" onClick={checkOrder}>주문 확인</Button></td>
                    <td><Button data-order-id={item.order_id} variant="danger" size="sm" onClick={rejectOrder}>주문 거절</Button></td>
                    <td><Button data-order-id={item.order_id} variant="warning" size="sm" onClick={detailOrder}>상세</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </SellerLayout>
    )
}

export async function getServerSideProps() {
  const res = await fetch(getAbsoluteURL() + `/api/orders`)
  const orders = await res.json()

  if (orders == null){
    console.log("값을 받아올 수 없습니다.")
    
  } else {
    return {
      props: { orders }
    }
  }
}
