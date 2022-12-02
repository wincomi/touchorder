import { Button, Form, Collapse } from 'react-bootstrap'
import {useState} from 'react'
import axios from 'axios'

export default ({ Login }) => {
    const [PhoneNumber, getPhoneNumber] = useState("")
    const [code, getcode] = useState("")
    const [isCert, showCert] = useState(false)
    const [userInfo, setUser] = useState([])
    const inputPhoneNumber=(e)=>{
        getPhoneNumber(e.target.value)
    };
    const inputac=(e)=>{
        getcode(e.target.value)
    };
    const checkCertCode=async()=>{
        const body = {
            phoneNumber: PhoneNumber,
            verificationCode: code
        }
        await axios
            .post("http://localhost:3000/api/auth/verification-code/verify", body)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))
    }
    const isUser=async ()=>{
        await axios
            .get(`http://localhost:3000/api/users`, 
            {params: {phoneNumber: PhoneNumber}},
            {withCredentials:true})
            .then((res)=>{console.log(res.data.message)
               console.log(res.data.result)
                setUser(res.data.result)
               console.log(userInfo)
            })
        getCertCode()
    }
    const getCertCode=async()=>{
        showCert(true)
        const body = {
            phoneNumber: PhoneNumber
        }
        await axios
            .post("http://localhost:3000/api/auth/verification-code/request", body)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))
    };
    return (
        <>
            <h1>휴대폰 번호를 입력해주세요</h1>
            <p>터치오더 이용을 위해 최소한의 정보를 수집하고 있습니다.</p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="tel" placeholder="01012345678" value={PhoneNumber} onChange={inputPhoneNumber}></Form.Control>
                    
                    <Form.Text className="text-muted">
                        입력한 휴대폰 번호로 인증 코드가 발송됩니다.
                    </Form.Text>
                </Form.Group>
                <Collapse in={isCert}>
                    <Form.Group>
                        <Form.Label>인증번호</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="인증번호를 입력해주세요"
                            value={code}
                            onChange={inputac}
                        />
                        <Button variant="primary" onClick={checkCertCode}>
                            확인
                        </Button>
                    </Form.Group>
                </Collapse>
                <div className="d-grid">
                    <Button variant="primary" size="lg" onClick={isUser}>확인</Button>
                </div>
            </Form>
        </>
    );
};