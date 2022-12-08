import SellerLayout from '@components/seller/SellerLayout'
import HeaderTitle from '@components/seller/HeaderTitle'
import { Button, Table } from 'react-bootstrap'

import { MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next'
import { getSession, GetSessionParams } from "next-auth/react"

import getAbsoluteURL from '@utils/absoluteURL'
import priceFormat from '@utils/priceFormat'
import dateFormat from '@utils/dateFormat'

import { t_order } from '@prisma/client'

type Props = {
  t_orders: t_order[]
}

export default ({ t_orders }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  if(t_orders == null) { router.replace(router.asPath) } //삭제 예정

  const statusToString = (status: number) => {
    switch (status) {
      case 0:
        return "대기 중"
      case 1:
        return "주문 확인"
      case 2:
        return "정산 완료"
      default:
        return "주문 취소"
    }
  }

  // 주문 확인 버튼
  const checkOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    var orderId = e.currentTarget.getAttribute('data-order-id')

    const result = await fetch(getAbsoluteURL() + `/api/orders/update_status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        status: 1,
      })
    })

    alert('주문을 확인하였습니다.')

    router.replace(router.asPath)
  }

  // 주문 거절 버튼
  const rejectOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    var orderId = e.currentTarget.getAttribute('data-order-id')

    const result = await fetch(getAbsoluteURL() + `/api/orders/update_status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        status: -1,
      })
    })

    alert('주문을 거절하였습니다.')

    router.replace(router.asPath)
  }

  // 주문 상세 버튼
  const detailOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    var orderId = e.currentTarget.getAttribute('data-order-id')

    router.push({
      pathname: '/seller/order_detailed',
      query: { order_id: orderId },
    })
  }

  return (
    <SellerLayout>
      <HeaderTitle title='주문' subtitle='주문 통합 조회' />
      <Table striped>
        <thead>
          <tr>
            <th>주문 번호</th>
            <th>주문이 들어온 테이블</th>
            <th>가격</th>
            <th>주문 날짜</th>
            <th>주문 상태</th>
            <th>주문 처리</th>
            <th>주문 상세</th>
          </tr>
        </thead>

        <tbody>
          {t_orders?.map((item) => (
            <tr>
              <td>{item.order_id}</td>
              <td>{item.table_id ?? '없음'}</td>
              <td>{priceFormat(item.payments)}원</td>
              <td>{dateFormat(item.date)}</td>
              <td>{statusToString(item.status)}</td>
              <td>
                {/*disabled 처리하기*/}
                <Button data-order-id={item.order_id} variant="primary" size="sm" disabled={item.status == 2 || item.status == 1} onClick={checkOrder}>주문 확인</Button>{` `}
                <Button data-order-id={item.order_id} variant="danger" size="sm" disabled={item.status == 2 || item.status == -1} onClick={rejectOrder}>주문 거절</Button>
              </td>
              <td><Button data-order-id={item.order_id} variant="dark" size="sm" onClick={detailOrder}>상세</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </SellerLayout>
  )
}

export async function getServerSideProps( context: GetSessionParams ) {
  const session = await getSession(context)

  if (session?.user == null) {
    const items: t_order[] = []
    return {
      props: { items }
    }
  }

  const storeId = session?.user.store_id

  const res = await fetch(getAbsoluteURL() + `/api/orders?store_id=${storeId}`)

  const t_orders: t_order[] = await res.json()

  return {
    props: { t_orders }
  }

}
