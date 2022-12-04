import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import {useState} from 'react'
import { Table, Button, Form, Collapse } from 'react-bootstrap'
import { InferGetStaticPropsType } from "next"
import { menu } from "@prisma/client"
import priceFormat from '@utils/priceFormat'
/*
  {
    menu_id: 7,
    store_id: 1,
    name: '콜라',
    content: '펩시/코카콜라',
    price: 1600,
    category: '음료',
    image_url: null,
    status: 0
  }
*/
export default ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isSetup,setup]=useState(false)
  return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="상품 설정" />
        <Table striped>
          <thead>
              <tr>
                {/*<th>#</th> */}
                {/* <th>이미지</th> */}
                <th>#</th>
                <th>이름</th>
                <th>가격</th>
                <th>설명</th>
                <th>수정/삭제</th>
              </tr>
          </thead>
          <tbody>
            {items.map((item) =>( 
              <>
              <tr>
                {/* <td>{item.menu_id}</td> */}
                {/* <td>{item.image_url == null ? <span className="text-muted">없음</span> : <>TODO</>}</td> */}
                <td>{item.menu_id}</td>
                <td>{item.name}</td>
                <td>{priceFormat(item.price)}원</td>
                <td>{item.content}</td>
                <td>
                  <Button variant="warning" onClick={setup} size="sm" data-menu-id={item.menu_id}>수정</Button>{` `}
                  <Button variant="danger" size="sm" data-menu-id={item.menu_id}>삭제</Button>
                </td>
              </tr>
              <Form>
                <Collapse in={isSetup}>
                    <Form.Group>
                        <Form.Label>인증번호</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="인증번호를 입력해주세요"
                            value={code}
                            onChange={inputac}
                        />
                        <Button variant="primary" onClick={checkCertCode}>
                            확인
                        </Button>
                    </Form.Group>
                </Collapse>
                <div className="d-grid">
                    <Button variant="primary" size="lg" onClick={isUser}>확인</Button>
                </div>
            </Form>
              </>
            ))}
          </tbody>
        </Table>
      </SellerLayout>
  )
}

export async function getStaticProps() {
  const store_id = 1 // TODO
  const res = await fetch(`http://localhost:3000/api/stores/${store_id}/menus/`)

  const items: menu[] = await res.json()
  console.log(items)
  return {
    props: { items }
  }
}
