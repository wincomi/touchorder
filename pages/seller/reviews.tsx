import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Button, Card, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import getAbsoluteURL from '@utils/absoluteURL'
import { InferGetServerSidePropsType } from 'next'
import { MouseEvent } from 'react'
import { useRouter } from "next/router"

type review = {
  review_id: number
  regdate: Date
  user_id: number
  user_name: string
  store_name: string
  menu_name: string
  rating: number
  content: string | null
  image_url1: string | null
  image_url2: string | null
  image_url3: string | null
}

type Props = {
  reviews: review[]
}

//리뷰 관리 이미지 및 관련내용 넣기
export default ({ reviews }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  
  const deleteReview = async (e: MouseEvent<HTMLButtonElement>) =>{
    var reviewId = e.currentTarget.getAttribute('data-review-id')
    var userId = e.currentTarget.getAttribute('data-user-id')

    const result = await fetch(getAbsoluteURL() + `/api/reviews/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        review_id: reviewId, 
      })
    })

   router.replace
  }

    return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="리뷰 관리" />
        <Row xs={1} md={2} className="g-4">
          {reviews.map((item) => ( 
            <Col>
              <Card>
                <div>
                  {item.image_url1 != null ? (<Image src={item.image_url1} width="100" height="100" alt={""} />) : <></>}
                  {item.image_url2 != null ? (<Image src={item.image_url2} width="100" height="100" alt={""} />) : <></>}
                  {item.image_url3 != null ? (<Image src={item.image_url3} width="100" height="100" alt={""} />) : <></>}
                </div>
                <Card.Body>
                  <Card.Title>{new Date(item.regdate).toISOString().split('T')[0]}</Card.Title>
                  <Card.Text>
                    {item.user_name}
                  </Card.Text>
                  <Card.Text>
                    {item.content}
                  </Card.Text>
                  <Card.Text className="text-end">
                    {/* <Button variant="primary">답변</Button> */}
                    <Button data-review-id={item.review_id} data-user-id={item.user_id} variant="danger" size="sm" onClick={deleteReview}>삭제</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </SellerLayout>
    )
}

export async function getServerSideProps() {
  const result = await fetch(getAbsoluteURL() + `/api/reviews/`)
  let reviews: review[] = await result.json()

  if (reviews == null){
    console.log("값을 받아올 수 없습니다.")
    
  } else {
    return {
      props: { reviews }
    }
  }
}
