import { ReactNode, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '@components/seller/Sidebar'

interface SellerLayoutProps {
    children: ReactNode
}

export default ({ children }: SellerLayoutProps) => {
    useEffect(() => {
        require(`bootstrap/dist/js/bootstrap.bundle.min.js`)
    })

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <Sidebar title="터치오더 판매자" />
                </Col>
                <Col md={9}>
                    {children}
                </Col>
            </Row>

            <style>
            {`
                /* 테이블 컬럼 세로 정렬 */
                td { vertical-align: middle }
            `}
            </style>
        </Container>
    )
}
