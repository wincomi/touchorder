import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { useEffect, useState } from "react"
import { Table, Button, Form } from "react-bootstrap"
import priceFormat from "@utils/priceFormat"
import getAbsoluteURL from "@utils/absoluteURL"
import { InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"

//이미지 추가안함
export default ({ item }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [update, setUpdate] = useState({
    name: "",
    price: "",
    content: "",
  })
  const [status, setStatus] = useState(item.status)

  useEffect(() => {
  }, [status])
  const checkEmpty = (string: string) => {
    if (string.length == 0){
      return null
    } else {
      return string
    }
  }
  const returnPrice = (price: string) => {
    if(price.length == 0){
      return item.price
    } else {
      return parseInt(price)
    }
  }
  const updateMenu = async (menu_id: number, store_id: number) => {
    
    const query = {
      name: checkEmpty(update.name) ?? item.name,
      price: returnPrice(update.price),
      content: checkEmpty(update.content) ?? item.content,
      status: status,
    }
    const result = await fetch(
      getAbsoluteURL() + `/api/stores/${store_id}/menus/${menu_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      }
    )
    router.back()
  }
  return (
    <>
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="상품 수정" />
        <Table striped>
          <thead>
            <tr>
              <th>현재 상태</th>
              <th>이름</th>
              <th>가격</th>
              <th>설명</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{item.menu_id}</td> */}
              {/* <td>{item.image_url == null ? <span className="text-muted">없음</span> : <>TODO</>}</td> */}
              <td>
                {
                  status == 0 ? 
                  (<Button variant="primary" size="sm" onClick={(e) => setStatus(1)}>판매 가능</Button>) : 
                  (<Button variant="danger" size="sm" onClick={(e) => setStatus(0)}>판매 불가</Button>)
                }
              </td>
              <td>
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder={item.name}
                      value={null}
                      onChange={(e) => {
                        setUpdate({ ...update, name: e.target.value })
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
                      placeholder={priceFormat(item.price)}
                      value={null}
                      onChange={(e) => {
                        setUpdate({ ...update, price: e.target.value })
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
                      placeholder={item.content}
                      value={null}
                      onChange={(e) => {
                        setUpdate({ ...update, content: e.target.value })
                      }}
                    />
                  </Form.Group>
                </Form>
              </td>
              <td>
                <Button variant="warning" onClick={() => { updateMenu(item.menu_id, item.store_id) }} size="sm">
                  수정</Button>
                {` `}
              </td>
            </tr>
          </tbody>
        </Table>
      </SellerLayout>
    </>
  )
}
export async function getServerSideProps(context) {
  const store_id = 1 // TODO
  const menu_id = context.query.menu_id
  const res = await fetch(
    getAbsoluteURL() + `/api/stores/${store_id}/menus/${menu_id}`
  )
  const item = await res.json()
  if (item == null) {
    console.log("값을 받아올 수 없습니다.")
  } else {
    return {
      props: { item },
    }
  }
}
