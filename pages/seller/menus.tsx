import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table, Button, Form, Collapse } from 'react-bootstrap'
import { useState } from 'react'

import { InferGetServerSidePropsType } from 'next'
import { useRouter } from "next/router"

import priceFormat from '@utils/priceFormat'
import getAbsoluteURL from '@utils/absoluteURL'

import { menu } from "@prisma/client"
import { getSession, useSession } from "next-auth/react"

//이미지, state 아직 추가안함
//TODO db랑 연동
export default ({ items }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const session = useSession()
  const [isAdd, setAdd] = useState(false)
  const [state, setState] = useState({ name: '', content: '', price: '', category: '', image_url: '', status: 0 })

  const addMenu = async () => {
    const store_id = session.user.store_id
    const result = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
    setAdd(false)
    router.replace(router.asPath)
  }

  const deleteMenu = async (menu_id: number, store_id: number) => {
    const result = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/menus/${menu_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    router.replace(router.asPath)
  }
  
  return (
    <SellerLayout>
      <HeaderTitle title="매장 관리" subtitle="상품 설정" />
      <Table striped>
        <thead>
          <tr>
            {/*<th>#</th> */}
            {/* <th>이미지</th> */}
            <th>상태</th>
            <th>이름</th>
            <th>가격</th>
            <th>설명</th>
            <th>이미지</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          <>
            {items.map((item) => (
              <tr>
                {/* <td>{item.menu_id}</td> */}
                {/* <td>{item.image_url == null ? <span className="text-muted">없음</span> : <>TODO</>}</td> */}
                {item.status == 0 ? <td>판매중</td> : <td>판매 불가</td>}
                <td>  {item.name} </td>
                <td> {priceFormat(item.price)} </td>
                <td> {item.content} </td>
                <td> {item.image_url}
                  <div className="preview">
                    {item.image_url && <img src={`/images/${item.image_url}`} />}
                  </div>
                </td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => { router.push('/seller/menu_update?menu_id=' + item.menu_id) }}>
                    수정</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => { deleteMenu(item.menu_id, item.store_id) }}>
                    삭제</Button>
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </Table>
      <Collapse in={isAdd}>
        <Form>
          <Form.Group>
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="메뉴 이름"
              value={""}
              onChange={(e) => { setState({ ...state, name: e.target.value }) }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>가격</Form.Label>
            <Form.Control
              type="text"
              placeholder="가격"
              value={""}
              onChange={(e) => { setState({ ...state, price: e.target.value }) }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>설명</Form.Label>
            <Form.Control
              type="text"
              placeholder="메뉴 설명"
              value={""}
              onChange={(e) => { setState({ ...state, content: e.target.value }) }}
            />
          </Form.Group>
        </Form>
      </Collapse>
      <p>
        <Button variant="primary" size="sm" onClick={() => { if (!isAdd) { setAdd(true) } else { addMenu() } }}>추가</Button>
      </p>
    </SellerLayout>
  )
}

export async function getServerSideProps( context ) {
  const session = await getSession(context)

  if (session.user == null) {
    const items: menu[] = []
    return {
      props: { items }
    }
  }

  const store_id = session.user.store_id
  const res = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/menus/`)

  const items: menu[] = await res.json()
  if (items == null) {
    console.log("값을 받아올 수 없습니다.")

  } else {
    return {
      props: { items }
    }
  }
}
