import SellerLayout from "../components/SellerLayout"
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

//제작중
export default ( {view} ) => {
    const[reviewData, setReveiwData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/reviews/allReviewsList')
        .then(res => res.json())
        .then(data => {
        setReveiwData(data);
        }).catch((e) => {console.log(e)});
    }, []);

    return (
        <SellerLayout>
            
             <Form>
                <Form.Group className="rb-1" controlId="formReview">
                    <Form.Control type="storeName" placeholder="가게이름"></Form.Control>
                    <Form.Text className="text-muted">
                        
                    </Form.Text>
                    <Form.Control type="menuName" placeholder="메뉴 이름"></Form.Control>
                </Form.Group>
                <div className="d-grid">
                    <Button type="submit" variant="primary" size="lg">확인</Button>
                </div>
            </Form>
          </SellerLayout>
    )
}