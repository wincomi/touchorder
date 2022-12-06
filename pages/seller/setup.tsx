import HeaderTitle from "@components/seller/HeaderTitle"
import SellerLayout from "@components/seller/SellerLayout"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import getAbsoluteURL from "@utils/absoluteURL"
import { InferGetServerSidePropsType } from "next"
import { store } from "@prisma/client"

export default ({ store }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    content: "",
    deposit: "",
    image_url: "",
  })
  const updateStore = async () => {
    const store_id = 1
    const update = {
      name: state.name,
      address: state.address,
      phone: state.phone,
      content: state.content,
      deposit: parseInt(state.deposit),
      image_url: state.image_url,
    }
    const result = await fetch(getAbsoluteURL() + `/api/stores/${store_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    })
  }
  return (
    <SellerLayout>
      <HeaderTitle title="매장 관리" subtitle="매장 정보 변경" />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>가게명</Form.Label>
          <Form.Control
            type="text"
            placeholder={store.name}
            value={null}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>주소</Form.Label>
          <Form.Control
            type="text"
            placeholder={store.address}
            value={null}
            onChange={(e) => setState({ ...state, address: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type="text"
            placeholder={store.phone}
            value={null}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>설명</Form.Label>
          <Form.Control
            type="text"
            placeholder={store.content}
            value={null}
            onChange={(e) => setState({ ...state, content: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>계좌-수정필요</Form.Label>
          <Form.Control
            type="text"
            placeholder="추가 예정"
            value={null}
            onChange={(e) =>
              setState({ ...state, deposit: e.target.value})
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>이미지</Form.Label>
          <Form.Control
            type="text"
            placeholder="추가 예정"
            value={null}
            onChange={(e) => setState({ ...state, image_url: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={updateStore}>
          수정
        </Button>
      </Form>
    </SellerLayout>
  )
}

export async function getServerSideProps() {
  const store_id = 1
  const res = await fetch(getAbsoluteURL() + `/api/stores/${store_id}`)
  const store: store = await res.json()
  if (store == null){
    console.log("값을 받아올 수 없습니다.")
    
  } else {
    return {
      props: { store }
    }
  }
}
