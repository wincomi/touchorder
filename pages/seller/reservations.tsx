import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table, Button } from 'react-bootstrap'

import { getSession, GetSessionParams} from "next-auth/react"
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import getAbsoluteURL from '@utils/absoluteURL'

import { store_table } from '@prisma/client'

type Props = {
  store_table: store_table[]
}

export default ({ store_table }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  if(store_table == null) { router.replace(router.asPath) } //삭제 예정

  const searchReservation = async (e: MouseEvent<HTMLButtonElement>) => {
    const tableId = e.currentTarget.getAttribute('data-table-id')

    router.push({
      pathname: '/seller/reservation_time',
      query: { table_id: tableId },
    })
  }
  return (
    //평균 평점도 나오게하기
    <SellerLayout>
      <HeaderTitle title="예약" subtitle="예약 통합 조회" />
      <Table striped>
        <thead>
          <tr>
            <th>테이블 번호</th>
            <th>최대 인원</th>
            <th>테이블 설명</th>
            <th>현재 상태</th>
            <th>예약조회</th>
          </tr>
        </thead>

        <tbody>
          {store_table?.map((item) => (
            <tr>
              <td>{item.table_id}</td>
              <td>{item.max_people}명</td>
              <td>{item.description ?? <span className="text-muted">설명 없음</span>}</td>
              <td>{(item.status) == 0 ? "예약 가능" : "예약 불가"}</td>
              <td>
                <Button variant="warning" size="sm" data-table-id={item.table_id} onClick={searchReservation}>예약 조회</Button>
              </td>
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
    const items: store_table[] = []
    return {
      props: { items }
    }
  }
  
  const store_id = session?.user.store_id
  
  const res = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/tables/`)
  const store_table: store_table[] = await res.json()

  return {
    props: { store_table }
  }
}
