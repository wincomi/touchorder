import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table, Button } from 'react-bootstrap'

export default ({ items }) => {
    return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="상품 설정" />
        <Table striped>
          <thead>
              <tr>
                {/*<th>#</th> */}
                {/* <th>이미지</th> */}
                <th>분류</th>
                <th>이름</th>
                <th>가격</th>
                <th>설명</th>
                <th>수정/삭제</th>
              </tr>
          </thead>
          <tbody>
            {items.map((item) =>( 
              <tr>
                {/* <td>{item.menu_id}</td> */}
                {/* <td>{item.image_url == null ? <span className="text-muted">없음</span> : <>TODO</>}</td> */}
                <td><a href="#">{item.category}</a></td>
                <td>{item.name}</td>
                <td>{new Intl.NumberFormat('ko-KR').format(item.price)}원</td>
                <td>{item.content}</td>
                <td>
                  <Button variant="warning" size="sm" data-menu-id={item.menu_id}>수정</Button>{` `}
                  <Button variant="danger" size="sm" data-menu-id={item.menu_id}>삭제</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </SellerLayout>
    )
}

export async function getStaticProps() {
  const store_id = 1 // TODO
  const res = await fetch(`http://localhost:3000/api/stores/${store_id}/menus/`)
  const items = await res.json()
  
  return {
    props: { items }
  }
}
