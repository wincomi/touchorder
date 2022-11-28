import { Button, Form } from 'react-bootstrap';

const Login = () => {
    return (
        <>
            <h1>휴대폰 번호를 입력해주세요</h1>
            <p>터치오더 이용을 위해 최소한의 정보를 수집하고 있습니다.</p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="tel" placeholder="010-1234-5678"></Form.Control>
                    <Form.Text className="text-muted">
                        입력한 휴대폰 번호로 인증 코드가 발송됩니다.
                    </Form.Text>
                </Form.Group>
                <div className="d-grid">
                    <Button type="submit" variant="primary" size="lg">확인</Button>
                </div>
            </Form>
        </>
    );
};

export default Login;
