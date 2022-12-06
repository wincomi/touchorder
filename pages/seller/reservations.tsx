import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import getAbsoluteURL from '@utils/absoluteURL'

export default ({ items }) => {
  const router = useRouter()

  const searchReservation = async (e) =>{
    var tableId = e.target.getAttribute('data-table-id')

    router.push({
      pathname: getAbsoluteURL() + '/seller/reservation_time',
      query: { table_id: tableId },
    })
  }

    return (
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
               {items.map((item) =>( 
                  <tr>
                    <td>{item.table_id}</td>
                    <td>{item.max_people}명</td>
                    <td>{item.description ?? <span className="text-muted">설명 없음</span>}</td>
                    <td>{(item.status) == 0 ? "예약 가능" : "예약 불가"}</td>
                    <td>
                      <Button variant="warning" size="sm" data-table-id={item.table_id} onClick = {searchReservation}>예약 조회</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </SellerLayout>
    )
}

export async function getServerSideProps() {
  const store_id = 1 // TODO
  const res = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/tables/`)
  const items = await res.json()
  
  return {
    props: { items }
  }
}
