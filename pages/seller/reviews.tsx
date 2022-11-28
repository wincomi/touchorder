import SellerLayout from "@components/seller/SellerLayout"
import { Button, Card }from 'react-bootstrap';

export default ({ reviews }) => {
    return (
      <SellerLayout>
        {reviews.map((item) => ( 
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image_url1} />
            <Card.Body>
              <Card.Text>닉네임</Card.Text>
              <Card.Text>
                {item.content}
              </Card.Text>
              <Button variant="primary">답변</Button>  {/* 답변 버튼을 우측으로 옮겨야 함 */}
            </Card.Body>
          </Card>
        ))}
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