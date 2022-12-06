import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { useState } from "react"
import { Table, Button, Form } from "react-bootstrap"
import getAbsoluteURL from "@utils/absoluteURL"
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

// TODO : status 구체화
//이미지 추가안함
export default ({ table }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [update, setUpdate] = useState({ max_people: "", description: ""})
  const [status, setStatus] = useState("")
  const store_id = 1
  const updateTable = async (table_id: number, store_id: number) => {
    const query = {
      max_people: update.max_people,
      description: update.description,
      status: 0
    }
    const result = await fetch(
      `http://localhost:3000/api/stores/${store_id}/tables/${table_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query),
      }
    )
    router.back()
  }
  return (
    <SellerLayout>
      <HeaderTitle title="매장 관리" subtitle="상품 수정" />
      <Table striped>
        <thead>
          <tr>
            <th>테이블 번호</th>
            <th>최대 인원</th>
            <th>테이블 설명</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>{item.table_id}</td> */}
            {/* <td>{item.image_url == null ? <span className="text-muted">없음</span> : <>TODO</>}</td> */}
            <td>{table.table_id}</td>
            <td>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder={"숫자만 적어주세요"}
                    value={null}
                    onChange={(e) => {
                      setUpdate({ ...update, max_people: e.target.value })
                    }}
                  />
                </Form.Group>
              </Form>
            </td>
            <td>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder={table.description}
                    value={null}
                    onChange={(e) => {
                      setUpdate({ ...update, description: e.target.value })
                    }}
                  />
                </Form.Group>
              </Form>
            </td>
            <td>
              <Button
                variant="warning"
                onClick={() => {
                  updateTable(table.table_id, table.store_id)
                }}
                size="sm"
              >
                수정
              </Button>
              {` `}
            </td>
          </tr>
        </tbody>
      </Table>
    </SellerLayout>
  )
}
export async function getServerSideProps(context) {
  const store_id = 1 // TODO
  const table_id = context.query.table_id
  const res = await fetch(
    getAbsoluteURL() + `/api/stores/${store_id}/tables/${table_id}`
  )
  const table = await res.json()
  if (table == null){
    console.log("값을 받아올 수 없습니다.")
    
  } else {
    return {
      props: { table }
    }
  }
}
