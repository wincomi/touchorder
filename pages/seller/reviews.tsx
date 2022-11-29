import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Button, Card, Row, Col } from 'react-bootstrap';
import Image from 'next/image'

//리뷰 관리 이미지 및 관련내용 넣기
export default ({ reviews }) => {
  const deleteReview = async (e) =>{
    var reviewId = e.target.getAttribute('data-review-id')
    var userId = e.target.getAttribute('data-user-id')

    const result = await fetch(`http://localhost:3000/api/reviews/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review_id: reviewId, 
      })
    })

   location.reload()
  }

    return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="리뷰 관리" />
        <Row xs={1} md={2} className="g-4">
          {reviews.map((item) => ( 
            <Col>
              <Card>
                <div>
                  {item.image_url1 != null ? (<Image src={item.image_url1} width="100" height="100" />) : <></>}
                  {item.image_url2 != null ? (<Image src={item.image_url2} width="100" height="100" />) : <></>}
                  {item.image_url3 != null ? (<Image src={item.image_url3} width="100" height="100" />) : <></>}
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

export async function getStaticProps() {
  const result = await fetch("http://localhost:3000/api/reviews/")
  let reviews = await result.json()

  return {
    props: { reviews }
  }
}
