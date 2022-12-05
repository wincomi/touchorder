import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Button, Table } from 'react-bootstrap';
import getAbsoluteURL from '@utils/absoluteURL'

export default ( {detailedorders} ) => {
    const back = async (e) =>{
        location.href = "/seller/orders"
      }

    return (
      <SellerLayout>
        <HeaderTitle title="주문" subtitle="주문 상세" />
        <Table striped>
              <thead>
                <tr>
                  <th>상세번호</th>
                  <th>주문번호</th>
                  <th>가격</th>
                  <th>갯수</th>
                  <th>총 가격</th>
                </tr>
              </thead>

              <tbody>
                {detailedorders.map((item) =>(
                  <tr>
                    <td>{item.detailed_order_id}</td>
                    <td>{item.order_id}</td>
                    <td>{item.price}원</td>
                    <td>{item.count}</td>
                    <td>{item.price*item.count}원</td>
                  </tr>
                ))}
              </tbody>
              <Button variant="primary" size="lg" onClick={back}>뒤로 가기</Button>
            </Table>
      </SellerLayout>
    )
}

export async function getServerSideProps(context) {

    var orderId = context.query.order_id

    const res = await fetch(getAbsoluteURL + `/api/orders/detailed-orders`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id: orderId, 
    })
  })
    
  const detailedorders = await res.json()
  
  return {
     props: { detailedorders }
   }
  }
  