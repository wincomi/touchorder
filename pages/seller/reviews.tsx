import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Button, Card, Row, Col } from 'react-bootstrap';

export default ({ reviews }) => {
    return (
      <SellerLayout>
        <HeaderTitle title="매장 관리" subtitle="리뷰 관리" />
        <Row xs={1} md={2} className="g-4">
          {reviews.map((item) => ( 
            <Col>
              <Card>
                <Card.Img variant="top" src={item.image_url1} />
                <Card.Body>
                  <Card.Title>닉네임</Card.Title>
                  <Card.Text>
                    {item.content}
                  </Card.Text>
                  <Card.Text className="text-end">
                    <Button variant="primary">답변</Button>
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
  const result = await fetch("http://localhost:3000/api/reviews/allReviewList/")
  let reviews = await result.json()

  return {
    props: { reviews }
  }
}
