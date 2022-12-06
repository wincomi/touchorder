import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Button, Table } from 'react-bootstrap'

import { MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next'

import getAbsoluteURL from '@utils/absoluteURL'
import dateFormat from "@utils/dateFormat"

import { t_order } from '@prisma/client'

type Props = {
  t_orders: t_order[]
}

export default ({ t_orders }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const checkedOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    var orderId = e.currentTarget.getAttribute('data-order-id')

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
    router.replace
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
                {t_orders.map((item) => (
                  <tr>
                    <td>{item.order_id}</td>
                    <td>{item.table_id}</td>
                    <td>{dateFormat(item.date)}</td>
                    <td>{(item.status == 1) ? "주문확인" : ""}</td>
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
  const t_orders: t_order[] = await res.json()

  if (t_orders == null){
    console.log("값을 받아올 수 없습니다.")
    
  } else {
    return {
      props: { t_orders }
    }
  }
}
