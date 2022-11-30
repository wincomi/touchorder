import { Button, Form, Collapse } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default ({ Login }) => {
    const [PhoneNumber, getPhoneNumber] = useState("");
    const [code, getcode] = useState("");
    const [isCert, showCert] = useState(false);
    
    const inputPhoneNumber=(e)=>{
        //e.preventDefault();
        getPhoneNumber(e.target.value);
    };
    const inputac=(e)=>{
        getcode(e.target.value);
        console.log(code)
    };
    const checkCertCode=async()=>{
        let body = {
            phoneNumber: PhoneNumber,
            verificationCode: code
        }
        axios
            .post("http://localhost:3000/api/verification-code/verify", body)
            .then((res)=>console.log(res));
    }
    const isUser=async(e)=>{
        let body = {
            phoneNumber: PhoneNumber
        }
        axios
            .get(`http://localhost:3000/api/users/${body=body}`)
            .then((res)=>console.log(res));
        await getCertCode();
    }
    const getCertCode=async()=>{
        showCert(true);
        let body = {
            phoneNumber: PhoneNumber
        }
        axios
            .post("http://localhost:3000/api/verification-code/request", body)
            .then((res)=>console.log(res));
    };
    useEffect(() => {

    },[])
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
                <div className="d-grid">
                    <Button type="submit" variant="primary" size="lg" onClick={()=>{isUser()}}>확인</Button>
                </div>
                <Collapse in={isCert}>
                    <Form.Group>
                        <Form.Label>identification Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="인증번호"
                            value={code}
                            onChange={inputac}
                        />
                        <Button variant="primary" type="submit" onClick={checkCertCode}>
                            확인
                        </Button>
                    </Form.Group>
                </Collapse>
            </Form>
        </>
    );
};