const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

// 문자 관련
const SMS = require('./sms');
// post 사용시 req.body 분석을 위해 추가
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // https://new93helloworld.tistory.com/42

// DB
const db = require('./database/db_connect');


app.listen(port, function() {
    console.log('http://localhost:' + port);
});

// 실행 전 client 프로젝트에서 npm run build 하기
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// 회원 가입
app.post('/sign-up', function(req, res){
    const connection = db.init();

    phoneNumber = req.body.phoneNumber;
    userName = req.body.userName;

    let query = `INSERT INTO user(phone_number, user_name) VALUES('${phoneNumber}', '${userName}');`;
    console.log(query);
    db.getConnection(connection);
    connection.query(query)
    db.end(connection);  

    res.send("회원 가입 완료"); 
})

// 인증 번호 요청 - url 경로 추후 변경
app.post('/request-verification-code', function(req, res) {
    phoneNumber = req.body.phoneNumber;
    SMS.request_verificationCode(phoneNumber);
    res.send("인증 번호 발급 완료");
});


// 인증 확인 - url 경로 추후 변경
app.post('/validate-verification-code', function(req, res) {
    phoneNumber = req.body.phoneNumber;
    verificationCode = req.body.verificationCode;
    console.log("휴대폰 번호 = " + phoneNumber);
    console.log("인증 번호 = " + verificationCode);

    var result = SMS.validate_verificationCode(phoneNumber, verificationCode);
    if (result) {
        res.send("인증 성공");
    }
    else {
        res.send("인증 실패");
    }
});