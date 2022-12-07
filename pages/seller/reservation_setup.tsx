import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table, Button } from 'react-bootstrap';
import getAbsoluteURL from '@utils/absoluteURL'

export default ({ items }) => {
  return (
    <SellerLayout>
      <HeaderTitle title="매장 관리" subtitle="예약 설정" />
      <thead>
        <tr>
          <th>테이블 번호</th>
          <th>최대 인원</th>
          <th>테이블 설명</th>
          <th>현재 상태</th>
          <th>상태 변경</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr>
            <td>{item.table_id}</td>
            <td>{item.max_people}명</td>
            <td>{item.description ?? <span className="text-muted">설명 없음</span>}</td>
            <td>{item.status}</td>
            <td>
              <Button variant="warning" size="sm" data-menu-id={item.menu_id}>수정</Button>{` `}
              <Button variant="danger" size="sm" data-menu-id={item.menu_id}>삭제</Button>
            </td>
          </tr>
        ))}
      </tbody>
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
