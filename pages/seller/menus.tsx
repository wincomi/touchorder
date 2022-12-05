import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { useState } from 'react'
import { Table, Button, Form, Collapse } from 'react-bootstrap'
import { InferGetStaticPropsType } from "next"
import { menu } from "@prisma/client"
import priceFormat from '@utils/priceFormat'
//이미지, state 아직 추가안함
export default ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {              
  const [isAdd,setAdd]=useState(false)
  const [state, setState] = useState({name:'', content:'', price:''})
  
  const addMenu = async()=>{
    console.log(state)
    const store_id=1
    const result = await fetch(`http://localhost:3000/api/${store_id}/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state)
    })
  }
  const updateMenu = async(menu_id:number, store_id:number)=>{
    const update={
      name:state[menu_id].name,
      content:state.content,
      price:parseInt(state.price)
    }
    console.log(update)
    const result = await fetch(`http://localhost:3000/api/${store_id}/menus/${menu_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "app"
    },
    body: JSON.stringify(state)
  })
  }
  const deleteMenu = async(menu_id:number, store_id:number)=>{
    const result = await fetch(`http://localhost:3000/api/${store_id}/menus/${menu_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
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
            <>
            {items.map((item) =>(
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
                          onChange={(e)=>{setState({...state,name:e.target.value})}}
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
                          onChange={(e)=>{setState({...state,price:e.target.value})}}
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
                          onChange={(e)=>{setState({...state,content:e.target.value})}}
                      />
                  </Form.Group>
                </Form>
              </td>
              <td>
                <Button variant="warning" onClick={() => {updateMenu(item.menu_id, item.store_id)}} size="sm">수정</Button>{` `}
                <Button variant="danger" size="sm" onClick={()=>{deleteMenu(item.menu_id, item.store_id)}}>삭제</Button>
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
                            value={null}
                            onChange={(e)=>{setState({...state,name:e.target.value})}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>가격</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="가격"
                            value={null}
                            onChange={(e)=>{setState({...state,price:e.target.value})}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>설명</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="메뉴 설명"
                            value={null}
                            onChange={(e)=>{setState({...state,content:e.target.value})}}
                        />
                    </Form.Group>
                  </Form>
                </Collapse>
                <div className="d-grid">
                    <Button variant="primary" size="sm" onClick={()=>{if(!isAdd){setAdd(true)}else{addMenu()}}}>추가</Button>
                </div>
      </SellerLayout>
  )
}

export async function getServerSideProps() {
  const store_id = 1 // TODO
  const res = await fetch(`http://localhost:3000/api/stores/${store_id}/menus/`)

  const items: menu[] = await res.json()
  return {
    props: { items }
  }
}
