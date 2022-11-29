import { ReactNode } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '@components/seller/Sidebar'

interface SellerLayoutProps {
    children: ReactNode,
}

export default ({ children }: SellerLayoutProps) => {
   return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <Sidebar />
                </Col>
                <Col md={9}>
                    {children}
                </Col>
            </Row>
        </Container>
   ) 
}
