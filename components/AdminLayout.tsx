import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/MyPage.module.css';
import {Button, Container, Navbar, Nav} from 'react-bootstrap';


const AdminLayout = ({ children }) => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">터치오더</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="/MyPage">내 정보</Nav.Link>
                        <Nav.Link href="/UpdateProfile">회원정보수정</Nav.Link>
                        <Nav.Link href="/order_list">주문 내역</Nav.Link>
                        <Nav.Link href="#pricing">...</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                {children}
            </Container>

            <div className={styles.Footer}>
                <Container>
                Presented by team Yeolilgop<br />
                Copyright 2022 Yeolilgop, Keimyung.- All rights Reserved.
                </Container>
            </div>
        </>
    );
}
export default AdminLayout;