import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Button, Table } from 'react-bootstrap'
import getAbsoluteURL from '@utils/absoluteURL'
import { InferGetServerSidePropsType } from 'next'

export default ({ orders }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const checkedOrder = async (e) => {
    var orderId = e.target.getAttribute('data-order-id')

    const result = await fetch(getAbsoluteURL() + `/api/orders/update_status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId, 
        status: 2,
      })
    })
   location.reload()
  }

    return (
      <SellerLayout>
        <HeaderTitle title="주문" subtitle="주문 알림" />
        <Table striped>
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>주문이 들어온 테이블</th>
                  <th>주문날짜</th>
                  <th>주문상태</th>
                  <th>주문정산</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((item) => (
                  <tr>
                    <td>{item.order_id}</td>
                    <td>{item.table_id}</td>
                    <td>{item.date}</td>
                    <td>{item.status == 1 ? "주문확인" : ""}</td>
                    <td><Button data-order-id={item.order_id} variant="warning" size="sm" onClick={checkedOrder}>주문 완료</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
      </SellerLayout>
    )
}

export async function getServerSideProps() {
  const res = await fetch(getAbsoluteURL() + `/api/orders/order_history`)
  const orders = await res.json()

  if (orders == null){
    console.log("값을 받아올 수 없습니다.")
    
  } else {
    return {
      props: { orders }
    }
  }
}
