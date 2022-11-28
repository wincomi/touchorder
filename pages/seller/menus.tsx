import SellerLayout from "@components/seller/SellerLayout"
import { Table } from 'react-bootstrap';

export default ({menus}) => {
    return (
      <div>
        <SellerLayout>
          <Table striped>
            <thead>
                <tr>
                  <th>메뉴번호</th>
                  <th>이미지</th>
                  <th>이름</th>
                  <th>가격</th>
                  <th>카테고리</th>
                  <th>설명</th>
                </tr>
            </thead>
            <tbody id = 'menuBox'>
              {menus.map((item) =>( 
                <>
                  <tr id = 'menuContent'>
                    <th> {item.menu_id} </th>
                    <th> {item.image_url} </th>
                    <th> {item.name} </th>
                    <th> {item.price} </th>
                    <th> {item.category} </th>
                    <th> {item.content} </th>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </SellerLayout>
        </div>
    )
}

export async function getStaticProps() {
  const store_id = 1
  //develop 브랜치랑 merge해야 정상작동할듯
  const res = await fetch(`http://localhost:3000/api/stores/${store_id}/menus/`)
  const menus = await res.json()
  
  return {
    props: { menus }
  }
}






















/* <thead>
<tr>
<th>메뉴 이름</th>
<th>가격</th>
<th>설명</th>
<th>사진</th>
</tr>
</thead>
<tbody>
<tr>
<th>1.컴포넌트 정의</th>
<th>2.컴포넌트 상태값에 db테이블 다 넣기</th>
<th>3.컴포넌트 상태값을 map함수로 테이블에 띄우기</th>
<th>4.profit!!!</th>
</tr>
</tbody>
*/