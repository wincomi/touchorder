import { ReactNode } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '@components/seller/Sidebar'

interface LayoutProps {
    children: ReactNode,
}

export default ({ children }: LayoutProps) => {
   return (
        <Container>
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
