import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/defaultLayout.module.css';

function defaultLayout() {
  return (
    <div>
        <Navbar collapseOnSelect expand="lg">
        <Container fluid>

            <Navbar.Brand href="#home" >터치오더</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <Nav.Link href="#deets">ㅁㄴㅇㄹ</Nav.Link>
                <Nav.Link href="#memes">
                사용자 표시
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <div className={styles.Footer}>
        &nbsp;&nbsp;Presented by team Yeolilgop<br />
        &nbsp;&nbsp;Copyright 2022 Yeolilgop, Keimyung.- All rights Reserved.
        </div>
    </div>
  );
}

export default defaultLayout;