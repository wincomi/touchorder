import HeaderTitle from "@components/seller/HeaderTitle"
import SellerLayout from "@components/seller/SellerLayout"
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

    return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="매장 정보 변경" />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>가게명</Form.Label>
              <Form.Control type="email" placeholder={result.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>주소</Form.Label>
              <Form.Control type="password" placeholder={result.address} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="password" placeholder={result.phone} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>설명</Form.Label>
              <Form.Control type="password" placeholder={result.content} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>계좌</Form.Label>
              <Form.Control type="password" placeholder="추가 예정" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>이미지</Form.Label>
              <Form.Control type="password" placeholder="추가 예정" />
            </Form.Group>
            <Button variant="primary" type="submit">
              수정
            </Button>
          </Form>
      </SellerLayout>
    )
}

export async function getStaticProps() {
  const storeId=1;
  let result ;
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