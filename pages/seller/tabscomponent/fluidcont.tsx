import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FluidContainer() {
  return (
    <Container fluid>
        <Col>
            <Row>
                메뉴
                <Button variant="outline-secondary" href="/seller/menus">메뉴정보</Button>{' '}
                <Button variant="outline-secondary" href="/seller/">재고관리</Button>{' '}
                <Button variant="outline-secondary" href="/login">Secondary</Button>{' '}
            </Row>
            <Row>
                주문
                <Button variant="outline-secondary" href="/seller/orders">주문조회</Button>{' '}
                <Button variant="outline-secondary" href="/seller/">주문변경/취소</Button>{' '}
                <Button variant="outline-secondary" href="//seller/">주문알림</Button>{' '}
            </Row>
            <Row>
                예약
                <Button variant="outline-secondary" href="/login">예약조회</Button>{' '}
                <Button variant="outline-secondary" href="/login">예약추가/취소</Button>{' '}
                <Button variant="outline-secondary" href="/login">예약설정</Button>{' '}
            </Row>
            <Row>
                리뷰
                <Button variant="outline-secondary" href="/login">리뷰조회</Button>{' '}
            </Row>
        </Col>
    </Container>
  );
}

export default FluidContainer;