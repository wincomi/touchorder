import { Button } from 'react-bootstrap';
import { MenuBar } from './MenuBar';

const SellerHome = () => {
    return (
        <>
            
            <h1>터치오더에 오신 것을 환영합니다!</h1>
            <p>고객님들의 주문을 효율적으로 받아보세요!</p>
            <div className="d-grid">
                <Button variant="primary" href="/Touchorder.kr/seller/login" size="lg">시작하기</Button>
            </div>
        </>
    );
};

export default SellerHome;