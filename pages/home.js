import { Button } from 'react-bootstrap';
// import { MenuBar } from '../pages/seller/MenuBar';

const Home = () => {
    return (
        <>
            <h1>터치오더에 오신 것을 환영합니다!</h1>
            <p>이제부터 터치 한번으로 음식을 주문해보세요.</p>
            <div className="d-grid">
                <Button variant="primary" href="/login" size="lg">시작하기</Button>
            </div>
        </>
    );
};

export default Home;