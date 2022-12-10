import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table, Button } from 'react-bootstrap'
import getAbsoluteURL from '@utils/absoluteURL'
import { MouseEvent } from 'react'
import { useRouter } from "next/router"

import dateFormat from '@utils/dateFormat'
import { getSession, GetSessionParams } from "next-auth/react"

type reserve = {
  reserve_id: number
  reserve_date: Date
  user_id: number
  user_name: string
  name: string
  store_id: string
  num_of_people: number
}

type Props = {
  reserve: reserve[]
}

export default ({ reserve }) => {

  const router = useRouter()

  if( reserve == null ) {router.replace(router.asPath)}
 
  const back = (e: MouseEvent<HTMLButtonElement>) => {

    router.back()
  }

    // 예약 거절 버튼
    const rejectReserve = async (e: MouseEvent<HTMLButtonElement>) => {
      var reserveId = e.currentTarget.getAttribute('data-reserve-id')
  
      const result = await fetch(getAbsoluteURL() + `/api/reservations/${reserveId}`, {method: 'DELETE'})
  
      alert('예약을 거절하였습니다.')
  
      router.replace(router.asPath)
    }

  return (
    <SellerLayout>
      <HeaderTitle title="예약" subtitle="예약 시간" />
      <Table striped>
        <thead>
          <tr>
            <th>예약번호</th>
            <th>고객이름</th>
            <th>예약테이블번호</th>
            <th>인원</th>
            <th>예약시간</th>
            <th>예약 거절</th>
          </tr>
        </thead>

        <tbody>
          {reserve?.map((item) => (
            <tr>
              <td>{item.reserve_id}</td>
              <td>{item.user_name}</td>
              <td>{item.store_table_id}번</td>
              <td>{item.num_of_people}명</td>
              <td>{dateFormat(item.reserve_date)}</td>
              {/*나중에 거절 사유 메시지 보내기 -캡스톤2 */}
              <td><Button data-reserve-id={item.reserve_id} variant="danger" size="sm" onClick={rejectReserve}>거절</Button></td>
            </tr>
          ))}
        </tbody>
        <br />
        <Button variant="primary" size="lg" onClick={back}>뒤로 가기</Button>
      </Table>
    </SellerLayout>
  )
}

export async function getServerSideProps( context: GetSessionParams ) {
  const session = await getSession(context)

  if (session?.user == null) {
    const items: reserve[] = []
    return {
      props: { items }
    }
  }

  const store_id = session?.user.store_id

  const table_id = context.query.table_id

  const res = await fetch(getAbsoluteURL() + `/api/reservations?storeId=${store_id}&tableId=${table_id}`)

  const reserve: reserve[] = await res.json()

  return {
    props: { reserve }
  }
}
