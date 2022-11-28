import { Button, Form, Collapse } from 'react-bootstrap';
import {useState, useEffect} from 'react'

export default ({ Login }) => {
    const [pn, getpn] = useState("");
    const [code, getcode] = useState("");
    const [isCert, showCert] = useState(false);
    const inputpn=(e)=>{
      getpn(e.target.value);
      console.log(pn)
    };
    //아래 함수들 전부 예외처리 필요, 백엔드랑 협업해서 해결해야할듯
    const getCertCode=async(e)=>{
      showCert(true);
      await fetch(`http://localhost:3000/api/request-code/${phoneNumber=pn}`,{method : 'POST'})
    };
    const inputac=(e)=>{
      getcode(e.target.value);
      console.log(code)
    };
    const checkCertCode=async()=>{
      await fetch(`http://localhost:3000/api/verify-code/${phoneNumber=pn, verificationCode=code}`,{method : 'POST'})
    }
    const isUser=async()=>{
      const user = await fetch(`http://localhost:3000/api/users/${phoneNumber=pn}`)
    }
    useEffect(() => {

    },[])
    return (
        <>
            <h1>휴대폰 번호를 입력해주세요</h1>
            <p>터치오더 이용을 위해 최소한의 정보를 수집하고 있습니다.</p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="tel" placeholder="01012345678" value={pn} onChange={inputpn}></Form.Control>
                    
                    <Form.Text className="text-muted">
                        입력한 휴대폰 번호로 인증 코드가 발송됩니다.
                    </Form.Text>
                </Form.Group>
                <div className="d-grid">
                    <Button type="submit" variant="primary" size="lg" onClick={()=>{isUser(),getCertCode}}>확인</Button>
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