import HeaderTitle from "@components/seller/HeaderTitle"
import SellerLayout from "@components/seller/SellerLayout"
import {useState} from "react"
import {Button, Form} from "react-bootstrap"
import axios from 'axios'

/*
model store {
  store_id      Int     @id @default(autoincrement())
  name          String  @db.VarChar(40)
  address       String  @db.VarChar(55)
  phone         String  @db.VarChar(55)
  content       String? @db.VarChar(255)
  deposit       Int?    @default(0)
  primary_color String? @db.VarChar(6)
  image_url     String? @db.VarChar(255)
}
*/
export default ({result}) => {
  const [state, setState] = useState({name:'', address:'', phone:'', content:'', deposit:0, image_url:''})
  const updateStore = async()=>{
    const store_id=1
    const result = await fetch(`http://localhost:3000/api/stores/${store_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state)
    })
  }
    return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="매장 정보 변경" />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>가게명</Form.Label>
              <Form.Control type="text" placeholder={result.name} value={state.name} onChange={(e) => setState({...state,name:e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>주소</Form.Label>
              <Form.Control type="text" placeholder={result.address} value={state.address} onChange={(e)=>setState({...state,address:e.target.value})}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="text" placeholder={result.phone} value={state.phone} onChange={(e)=>setState({...state,phone:e.target.value})}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>설명</Form.Label>
              <Form.Control type="text" placeholder={result.content} value={state.content} onChange={(e)=>setState({...state,content:e.target.value})}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>계좌-수정필요</Form.Label>
              <Form.Control type="text" placeholder="추가 예정" value={state.deposit} onChange={(e)=>setState({...state,deposit:parseInt(e.target.value)})}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>이미지</Form.Label>
              <Form.Control type="text" placeholder="추가 예정" value={state.image_url} onChange={(e)=>setState({...state,image_url:e.target.value})}  />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={updateStore}>
              수정
            </Button>
          </Form>
      </SellerLayout>
    )
}

export async function setStaticProps() {
  const storeId=1;
  let result;
  if(storeId!=null){
    await axios
    .get(`http://localhost:3000/api/stores`, 
    {params: {store_id: storeId}})
    .then((res)=>{ result=res.data.result })
    return {
      props: { result }
    }
  }
}