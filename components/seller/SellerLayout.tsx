import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '@components/seller/Sidebar'

export default ({ children }) => {
   return (
    <>
        <Container>
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    <main>
                        {children}
                    </main>
                </Col>
            </Row>
        </Container>
    </>
   ) 
}