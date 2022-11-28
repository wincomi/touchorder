import SellerLayout from "@components/seller/SellerLayout"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



export default ({Reviews}) => {
    return (
        <div>
        <SellerLayout>
    <pre>-리뷰 - reviews.tsx
    \리뷰 조회
    \리뷰 관리
    </pre>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>맛있네요~!</Card.Title>
            <Card.Text>빠누</Card.Text>
            <Card.Text>
              배달도 빨랐고 서비스로 음료수도 주셨습니다. 감사합니다!^^
            </Card.Text>
        <Button variant="primary">답변</Button>  {/*답변 버튼을 우측으로 옮겨야 함*/}
      </Card.Body>
    </Card>
        
        </SellerLayout>
        </div>

    )
}