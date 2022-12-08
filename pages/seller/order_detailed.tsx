import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Button, Table } from 'react-bootstrap'

import { MouseEvent } from 'react'
import { useRouter } from "next/router"
import { InferGetServerSidePropsType } from 'next'

import getAbsoluteURL from '@utils/absoluteURL'

import { detailed_order } from '@prisma/client'

type Props = {
  detailed_order: detailed_order[]
}

export default ({ detailed_order }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const back = (e: MouseEvent<HTMLButtonElement>) => {

    router.push(`/seller/orders`)
  }

  return (
    <SellerLayout>
      <HeaderTitle title="주문" subtitle="주문 상세" />
      <Table striped>
        <thead>
          <tr>
            <th>상세번호</th>
            <th>주문번호</th>
            <th>메뉴</th>
            <th>가격</th>
            <th>갯수</th>
            <th>총 가격</th>
          </tr>
        </thead>

        <tbody>
          {detailed_order.map((item) => (
            <tr>
              <td>{item.detailed_order_id}</td>
              <td>{item.order_id}</td>
              <td>{item.menu_name}</td>
              <td>{item.price}원</td>
              <td>{item.count}</td>
              <td>{item.price * item.count}원</td>
            </tr>
          ))}
        </tbody>
        <br />
        <Button variant="primary" size="lg" onClick={back}>뒤로 가기</Button>
      </Table>
    </SellerLayout>
  )
}

export async function getServerSideProps(context: { query: { order_id: Number } }) {

  var orderId = context.query.order_id

  const res = await fetch(getAbsoluteURL() + `/api/orders/detailed-orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id: orderId,
    })
  })

  const detailed_order: detailed_order[] = await res.json()

  if (detailed_order == null) {
    console.log("값을 받아올 수 없습니다.")

  } else {
    return {
      props: { detailed_order }
    }
  }
}
