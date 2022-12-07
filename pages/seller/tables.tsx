import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table, Button, Form, Collapse } from 'react-bootstrap'
import getAbsoluteURL from '@utils/absoluteURL'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { store_table } from "@prisma/client"

export default ({ tables }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [isAdd, setAdd] = useState(false)
  const [state, setState] = useState({ max_people: '', description: '' })

  const addTable = async () => {
    const store_id = 1
    const table = {
      max_people: parseInt(state.max_people),
      description: state.description,
      status: 0
    }
    const result = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/tables`, {//result받아서 처리 안하는것도 고쳐보자
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(table)
    })
    setAdd(false)
    router.replace(router.asPath)
  }

  const deleteTable = async (table_id: number, store_id: number) => {
    const result = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/tables/${table_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    router.replace(router.asPath)
  }
  return (
    <SellerLayout>
      <HeaderTitle title="매장 관리" subtitle="테이블 설정" />
      <Table striped>
        <thead>
          <tr>
            <th>테이블 번호</th>
            <th>최대 인원</th>
            <th>테이블 설명</th>
            <th>상태</th>
            <th>수정/삭제</th>
          </tr>
        </thead>

        <tbody>
          {tables.map((item) => (
            <tr>
              <td>{item.table_id}</td>
              <td>{item.max_people}명</td>
              <td>{item.description ?? <span className="text-muted">설명 없음</span>}</td>
              {item.status == 0 ? (<td>사용 가능</td>) :
                (item.status == 1 ? (<td>예약 불가능</td>) :
                  (<td>사용 불가능</td>))
              }
              <td>
                <Button variant="warning" size="sm" onClick={() => { router.push('/seller/tables_update?table_id=' + item.table_id) }}>
                  수정</Button>{` `}
                <Button variant="danger" size="sm" onClick={() => { deleteTable(item.table_id, item.store_id) }}>
                  삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Collapse in={isAdd}>
        <Form>
          <Form.Group>
            <Form.Label>최대 인원</Form.Label>
            <Form.Control
              type="text"
              placeholder="숫자만 적어주세요"
              value={""}
              onChange={(e) => { setState({ ...state, max_people: e.target.value }) }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>테이블 설명</Form.Label>
            <Form.Control
              type="text"
              placeholder="테이블 설명"
              value={""}
              onChange={(e) => { setState({ ...state, description: e.target.value }) }}
            />
          </Form.Group>
        </Form>
      </Collapse>
      <p>
        <Button variant="primary" size="sm" onClick={() => { if (!isAdd) { setAdd(true) } else { addTable() } }}>
          추가</Button>
      </p>
    </SellerLayout>
  )
}

export async function getServerSideProps() {
  const store_id = 1 // TODO
  const res = await fetch(getAbsoluteURL() + `/api/stores/${store_id}/tables`)
  const tables: store_table[] = await res.json()
  if (tables == null) {
    console.log("값을 받아올 수 없습니다.")

  } else {
    return {
      props: { tables }
    }
  }
}
