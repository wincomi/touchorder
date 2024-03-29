import { Container, Button, Form, Collapse } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import getAbsoluteURL from '@utils/absoluteURL'
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router'

export default () => {
    const [PhoneNumber, getPhoneNumber] = useState("")
    const [code, getcode] = useState("")
    const [isCert, showCert] = useState(false)
    const [userInfo, setUser] = useState({})

    const checkCertCode = async () => {
        const body = {
            phoneNumber: PhoneNumber,
            verificationCode: code
        }
        await axios //res:정상이면 db에 회원가입, err면 번호 또는 인증코드가 틀립니다 띄우기
            .post(getAbsoluteURL() + "/api/auth/verification-code/verify", body)
            .then( async (res) => {
                if ( res.status == 200 ) { 
                    const result = await fetch(
                        getAbsoluteURL() + `/api/users`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ phone_number: PhoneNumber}),
                        }).then((res) => {
                            if (res.status == 400) { alert(res.message)}
                            else { alert('회원가입 성공!'); router.reload() }
                        }
                      )

                }
                else if ( res.status == 400 ) { alert('인증코드가 틀립니다.') }
            })
            .catch((err) => console.log(err))
    }

    const isUser = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            phone_number: PhoneNumber
        })

        if (!result?.error) {
            // alert('로그인 성공!')
            router.reload()
        } else {
            //alert(result.error)
            getCertCode()
        }
    }

    // console.log(getAbsoluteURL() + `/api/users`)
    // await axios
    //     .get(getAbsoluteURL() + `/api/users`,
    //         { params: { phoneNumber: PhoneNumber } })
    //     .then((res) => {
    //         console.log(res.data.message)
    //         console.log(res.data.result)
    //         setUser(res.data.result)
    //         console.log(userInfo)
    //     })

    // getCertCode()


    const getCertCode = async () => {
        showCert(true)
        const body = {
            phoneNumber: PhoneNumber
        }
        await axios
            .post(getAbsoluteURL() + "/api/auth/verification-code/request", body)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const session = useSession()
    const router = useRouter()

    if (session.data?.user != null) {
        return (
            <Container className="mt-3">
                <h1>로그인이 되었습니다.</h1>
                <p>{session.data.user.phone_number} 회원님 안녕하세요.</p>
                <p>
                    <Button onClick={() => signOut()}>로그아웃</Button>{' '}
                    <Button onClick={() => router.push('/seller/orders')} disabled={session.data?.user.is_admin != 1}>판매자 관리 페이지</Button>
                </p>
            </Container>
        )
    }

    return (
        <Container className="mt-3">
            <h1>휴대폰 번호를 입력해주세요</h1>
            <p>터치오더 이용을 위해 최소한의 정보를 수집하고 있습니다.</p>
            <div className="d-grid">
            <Form>
                <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                    <Form.Control className = "w-50" type="tel" placeholder="01012345678" value={PhoneNumber} onChange={(e) => { getPhoneNumber(e.target.value) }}></Form.Control>
                    <Form.Text className="text-muted">
                        처음 이용하시는 분은 인증 번호가 발송됩니다.
                    </Form.Text>
                </Form.Group>
                {<Collapse in={isCert}>
                    <Form.Group className="w-25">
                        <Form.Label>인증번호</Form.Label>
                        <Form.Control
                            className = ""
                            type="text"
                            placeholder="인증번호를 입력해주세요"
                            value={code}
                            onChange={(e) => { getcode(e.target.value) }}
                        />
                    </Form.Group>
                </Collapse>}<br></br>
                    <Button variant="primary" size="md" onClick={() => {if(!isCert)isUser(); else checkCertCode();}}>확인</Button>
            </Form>
            </div>
        </Container>
    )
}
