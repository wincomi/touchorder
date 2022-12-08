import { ReactNode, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Sidebar from '@components/seller/Sidebar'
import { getSession, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

interface SellerLayoutProps {
    children: ReactNode
}

export default ({ children }: SellerLayoutProps) => {
    useEffect(() => {
        require(`bootstrap/dist/js/bootstrap.bundle.min.js`)
    })

    const session = useSession()
    const router = useRouter()

    if (session.data == null) {
        return (
            <Container className="mt-3">
                <h1>관리자 권한이 없습니다.</h1>
                <p><Button onClick={() => router.push('/')}>홈으로</Button></p>
            </Container>
        )
    }

    if (session.data?.user.is_admin != 1) {
        return (
            <Container className="mt-3">
                <h1>관리자 권한이 없습니다.</h1>
                <p><Button onClick={() => signOut({callbackUrl: `/`})}>로그아웃</Button></p>
            </Container>
        )
    }

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
