import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { useState } from 'react'
import { Table, Button, Form} from 'react-bootstrap'
import { useRouter } from 'next/router'
import priceFormat from '@utils/priceFormat'
//이미지, state 아직 추가안함
export default() => {              
  const [update, setUpdate] = useState({})
  const router = useRouter()
  const {routeItem}=router.query
  const item=JSON.parse(routeItem)
  setUpdate(item)
  console.log(update)
  const updateMenu = async(menu_id:number, store_id:number)=>{
    /*
    const result = await fetch(`http://localhost:3000/api/${store_id}/menus/${menu_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "app"
    },
    body: JSON.stringify(update)
    })
    */
  }
    return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="상품 수정" />
        <Table striped>
          <thead>
              <tr>
                <th>#</th>
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
                {item.menu_id}
              </td>
              <td>                
                <Form>
                  <Form.Group>
                      <Form.Control
                          type="text"
                          placeholder={item.name}
                          value={null}
                          onChange={(e)=>{setUpdate({...update,name:e.target.value})}}
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
                          onChange={(e)=>{setUpdate({...update,price:e.target.value})}}
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
                          onChange={(e)=>{setUpdate({...update,content:e.target.value})}}
                      />
                  </Form.Group>
                </Form>
              </td>
              <td>
                <Button variant="warning" onClick={() => {updateMenu(item.menu_id, item.store_id)}} size="sm">수정</Button>{` `}
              </td>
            </tr>
          </tbody>
        </Table>
      </SellerLayout>
  )
}