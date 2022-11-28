import { ReactNode } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '@components/seller/Sidebar'

interface LayoutProps {
    children: ReactNode
}

export default ({ children }: LayoutProps) => {
   return (
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
   ) 
}