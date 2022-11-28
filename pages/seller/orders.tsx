import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table } from 'react-bootstrap';

export default ({ orders }) => {
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
                </tr>
              </thead>

              <tbody>
                {orders.map((item) =>(
                  <tr>
                    <td>{item.order_id}</td>
                    <td>{item.table_id}</td>
                    <td>{new Intl.NumberFormat('ko-KR').format(item.payments)}원</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </SellerLayout>
    )
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/api/orders`)
  const orders = await res.json()

return {
   props: { orders }
 }
}
