import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { useState, useEffect } from "react"
import { Table, Button, Form } from "react-bootstrap"
import getAbsoluteURL from "@utils/absoluteURL"
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { getSession, GetSessionParams } from "next-auth/react"

// TODO : status 구체화
//이미지 추가안함
export default ({ table }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  if(table == null) { router.replace(router.asPath) } //삭제 예정

  const [update, setUpdate] = useState({ max_people: "", description: "" })
  const [status, setStatus] = useState(table.status)

  useEffect(() => {
  }, [status])

  const checkEmpty = (string: string) => {
    console.log(string.length)
    if (string.length == 0) {
      return null
    } else {
      return string
    }
  }

  const returnPeople = (people: string) => {
    if (people.length == 0) {
      return table.max_people
    } else {
      return parseInt(people)
    }
  }
  const updateTable = async (table_id: number, store_id: number) => {
    const query = {
      max_people: returnPeople(update.max_people),
      description: checkEmpty(update.description) ?? table.description,
      status: status
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
            <th>상태</th>
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
              {
                status == 0 ?
                  (<Button variant="primary" size="sm" onClick={(e) => setStatus(1)}>사용 가능</Button>) :
                  (status == 1 ?
                    (<Button variant="warning" size="sm" onClick={(e) => setStatus(2)}>예약 불가능</Button>) :
                    (<Button variant="danger" size="sm" onClick={(e) => setStatus(0)}>사용 불가능</Button>))
              }
            </td>
            <td>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder={"숫자만 적어주세요"}
                    value={""}
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
                    value={""}
                    onChange={(e) => { setUpdate({ ...update, description: e.target.value }) }}
                  />
                </Form.Group>
              </Form>
            </td>
            <td>
              <Button variant="warning" onClick={() => { updateTable(table.table_id, table.store_id) }} size="sm">
                수정</Button>
              {` `}
            </td>
          </tr>
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
  const table_id = context.query.table_id
  const res = await fetch(
    getAbsoluteURL() + `/api/stores/${store_id}/tables/${table_id}`
  )
  const table = await res.json()
  if (table == null) {
    console.log("값을 받아올 수 없습니다.")
  } else {
    return {
      props: { table }
    }
  }
}
