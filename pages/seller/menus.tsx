import SellerLayout from "../../components/SellerLayout"
import { Table } from 'react-bootstrap';
import { PrismaClient } from "@prisma/client";

export default ({menus}) => {
    return (
      <div>
        <SellerLayout>
          <pre>
          -메뉴관리 - menus.tsx
          \메뉴추가및 관리
            \메뉴정보
          \재고관리
          </pre>
            <Table striped>
              <thead>
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
                  <th>4.끝</th>
                </tr>
              </tbody>
            </Table>
        </SellerLayout>
        </div>
    )
}


export async function getServerSideProps() {
  const prisma = new PrismaClient()
  const menus = await prisma.menu.findMany({
    where: {
      store_id: 1
    }
  })

  // api/stores/[store_id]/menus (GET)
  return {
    props: { menus }
  }
}