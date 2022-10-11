const Login = () => {
    return (
        <div>
            <h1>휴대폰 번호를 입력해주세요</h1>
            <p>터치오더 이용을 위해 최소한의 정보를 수집하고 있습니다.</p>
            <input type="tel"></input>
            <p>입력한 휴대폰 번호로 인증 코드가 발송됩니다.</p>
            <button type="button">확인</button>
        </div>
    );
};

export default Login;